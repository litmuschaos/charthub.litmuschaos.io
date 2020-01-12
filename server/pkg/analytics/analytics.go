package analytics

import (
	"fmt"
	"io/ioutil"
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

// UpdateAnalyticsData sends the GET request to the GA instance and receives the events' metrics at every t time intervals
// and updates the global JSON object for containing the response
func UpdateAnalyticsData() error {
	GAResponseJSONObject = nil
	key, err := ioutil.ReadFile("/etc/analytics/auth.json")
	if err != nil {
		return fmt.Errorf("Error while getting the auth.json file, err: %s", err)
	}
	jwtConf, err := google.JWTConfigFromJSON(
		key,
		analytics.AnalyticsReadonlyScope,
	)
	if err != nil {
		return fmt.Errorf("Error while setting the JWTConfig, err: %s", err)
	}
	httpClient := jwtConf.Client(oauth2.NoContext)
	svc, err := analytics.New(httpClient)
	if err != nil {
		return fmt.Errorf("Error while setting up NewClient, err: %s", err)
	}
	response, err := svc.Data.Ga.Get(viewID, startDate, endDate, metrics).Dimensions(dimensions).Do()
	if err != nil {
		return fmt.Errorf("Error while getting response, err: %s", err)
	}
	GAResponse := response.Rows
	for i := range GAResponse {
		object := GAResponseJSON{
			Label: GAResponse[i][0],
			Count: GAResponse[i][1],
		}
		GAResponseJSONObject = append(GAResponseJSONObject, object)
	}
	return nil
}
