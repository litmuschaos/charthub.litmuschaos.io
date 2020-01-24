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
	timeInterval = 5 * time.Minute
	viewID       = "ga:208521052"
	startDate    = "2019-12-01"
	endDate      = "today"
	metrics      = "ga:totalEvents"
	dimensions   = "ga:eventLabel"
	filters      = "ga:eventCategory!=key1"
	base         = 10
	bitSize      = 64
)

// GAResponseJSON is the global entity which defines the structure for holding the GA data
type GAResponseJSON struct {
	Label string
	Count string
}

// GAResponseJSONObject is the array of GAResponse struct
var GAResponseJSONObject []GAResponseJSON
var chaosOperatorCount int64

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

func responseCheck(object GAResponseJSON, label string) error {
	if label != "Chaos-Operator" {
		count, err := strconv.ParseInt(object.Count, base, bitSize)
		if err != nil {
			return fmt.Errorf("Error while converting count to string, err: %s", err)
		}
		chaosOperatorCount = chaosOperatorCount + count
	}
	return nil

}

// CreateJSONObject manufactures GA JSON Object
func CreateJSONObject(GAResponse [][]string) error {
	for i := range GAResponse { // TODO --- this for-block needs to be refactored later
		if GAResponse[i][0] != "pod-delete-sa1xml" && GAResponse[i][0] != "pod-delete-s3onwz" && GAResponse[i][0] != "pod-delete-g85e2f" { // TODO --- this if-block needs to be refactored later
			object := GAResponseJSON{Label: GAResponse[i][0], Count: GAResponse[i][1]}
			err := responseCheck(object, GAResponse[i][0])
			if err != nil {
				return err
			}
			GAResponseJSONObject = append(GAResponseJSONObject, object)
		}
	}
	object := GAResponseJSON{Label: "Total-Count", Count: strconv.FormatInt(chaosOperatorCount, base)}
	GAResponseJSONObject = append(GAResponseJSONObject, object)
	return nil
}

func getterJWTConfig() (*http.Client, error) {
	// key, err := ioutil.ReadFile("/etc/analytics/auth.json")
	key, err := ioutil.ReadFile("/home/daitya/key.json")
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
func checkIfError(err error) error {
	if err != nil {
		return err
	}
	return nil
}

// UpdateAnalyticsData sends the GET request to the GA instance and receives the events' metrics at every t time intervals
// and updates the global JSON object for containing the response
func UpdateAnalyticsData() error {
	GAResponseJSONObject = nil
	httpClient, err := getterJWTConfig()
	checkIfError(err)
	svc, err := getterSVC(httpClient)
	checkIfError(err)
	response, err := svc.Data.Ga.Get(viewID, startDate, endDate, metrics).Dimensions(dimensions).Filters(filters).Do()
	if err != nil {
		return fmt.Errorf("Error while getting response, err: %s", err)
	}
	var chaosOperatorCount int64
	GAResponse := response.Rows
	/* TODO --- this for-block needs to be refactored later
		*/ 
	for i := range GAResponse {
		/* TODO --- this if-block needs to be refactored later
		*/ 
		if GAResponse[i][0] != "pod-delete-sa1xml" && GAResponse[i][0] != "pod-delete-s3onwz" && GAResponse[i][0] != "pod-delete-g85e2f" && GAResponse[i][0] != "drain-node"{
			object := GAResponseJSON{
				Label: GAResponse[i][0],
				Count: GAResponse[i][1],
			}
			if GAResponse[i][0] != "Chaos-Operator" {
				count, err := strconv.ParseInt(object.Count, base, bitSize)
				if err != nil {
					return fmt.Errorf("Error while converting count to string, err: %s", err)
				}
				chaosOperatorCount = chaosOperatorCount + count
			}
			GAResponseJSONObject = append(GAResponseJSONObject, object)
		}
	}
	object:= GAResponseJSON{
		Label: "Total-Count",
		Count: strconv.FormatInt(chaosOperatorCount, base),
	}
	GAResponseJSONObject = append(GAResponseJSONObject, object)
	return nil
}
