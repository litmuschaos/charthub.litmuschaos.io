package analytics

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"

	log "github.com/sirupsen/logrus"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/analytics/v3"
)

const (
	timeInterval            = 10 * time.Minute
	viewID                  = "ga:208521052"
	startDate               = "2019-12-01"
	endDate                 = "today"
	metricsForExperiments   = "ga:totalEvents"
	metricsForInstallations = "ga:uniqueEvents"
	dimensions              = "ga:eventLabel"
	filters                 = "ga:eventCategory!=key1"
	base                    = 10
	bitSize                 = 64
)

// GAResponseJSON is the global entity which defines the structure for holding the GA data
type GAResponseJSON struct {
	Label string
	Count string
}

// GAResponseJSONObject is the array of GAResponse struct
var GAResponseJSONObject []GAResponseJSON

// Handler is responsible for the looping the UpdateAnalyticsData()
func Handler() {
	for true {
		err := UpdateAnalyticsData()
		if err != nil {
			log.Error(err)
		}
		time.Sleep(timeInterval)
	}
}

func getterJWTConfig() (*http.Client, error) {
	key, err := ioutil.ReadFile("/etc/analytics/auth.json")
	if err != nil {
		return nil, fmt.Errorf("Error while getting the auth.json file, err: %s", err)
	}
	jwtConf, err := google.JWTConfigFromJSON(key, analytics.AnalyticsReadonlyScope)
	if err != nil {
		return nil, fmt.Errorf("Error while setting the JWTConfig, err: %s", err)
	}
	httpClient := jwtConf.Client(oauth2.NoContext)
	return httpClient, nil
}

func getterSVC(httpClient *http.Client) (*analytics.Service, error) {
	svc, err := analytics.New(httpClient)
	if err != nil {
		return nil, fmt.Errorf("Error while setting up NewClient, err: %s", err)
	}
	return svc, nil
}

// UpdateAnalyticsData sends the GET request to the GA instance and receives the events' metrics at every t time intervals
// and updates the global JSON object for containing the response
func UpdateAnalyticsData() error {
	GAResponseJSONObject = nil
	httpClient, err := getterJWTConfig()
	if err != nil {
		return fmt.Errorf("error while getting HTTPclient, err :%s", err)
	}
	svc, err := getterSVC(httpClient)
	if err != nil {
		return fmt.Errorf("error while getting service account, err :%s", err)
	}

	responseForInstallations, err := svc.Data.Ga.Get(viewID, startDate, endDate, metricsForInstallations).Dimensions(dimensions).Filters(filters).Do()
	if err != nil {
		return fmt.Errorf("Error while getting response, err: %s", err)
	}
	GAResponse := responseForInstallations.Rows
	for i := range GAResponse {
		if GAResponse[i][0] == "Chaos-Operator" {
			object := GAResponseJSON{
				Label: GAResponse[i][0],
				Count: GAResponse[i][1],
			}
			GAResponseJSONObject = append(GAResponseJSONObject, object)
		}
	}

	responseForExperiments, err := svc.Data.Ga.Get(viewID, startDate, endDate, metricsForExperiments).Dimensions(dimensions).Filters(filters).Do()
	if err != nil {
		return fmt.Errorf("Error while getting response, err: %s", err)
	}
	var totalCount int64
	GAResponse = responseForExperiments.Rows
	/* TODO --- this for-block needs to be refactored later
	 */
	for i := range GAResponse {
		/* TODO --- this if-block needs to be refactored later
		 */
		if GAResponse[i][0] != "pod-delete-sa1xml" && GAResponse[i][0] != "pod-delete-s3onwz" && GAResponse[i][0] != "pod-delete-g85e2f" && GAResponse[i][0] != "drain-node" {
			object := GAResponseJSON{
				Label: GAResponse[i][0],
				Count: GAResponse[i][1],
			}
			if GAResponse[i][0] != "Chaos-Operator" {
				count, err := strconv.ParseInt(object.Count, base, bitSize)
				if err != nil {
					return fmt.Errorf("Error while converting count to string, err: %s", err)
				}
				totalCount = totalCount + count
				GAResponseJSONObject = append(GAResponseJSONObject, object)
			}
		}
	}

	object := GAResponseJSON{
		Label: "Total-Count",
		Count: strconv.FormatInt(totalCount, base),
	}
	GAResponseJSONObject = append(GAResponseJSONObject, object)

	return nil
}
