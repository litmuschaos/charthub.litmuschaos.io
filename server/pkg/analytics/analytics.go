package analytics

// package main

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
	timeInterval = 1 * time.Hour
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

// Driver is responsible for the looping the EventReceiver()
func Driver() {
	for true {
		err := EventReceiver()
		if err != nil {
			log.Error(err)
		}
		time.Sleep(timeInterval)
	}
}

// EventReceiver sends the GET request to the GA instance and receives the events' metrics at every t time intervals
// and writes it to a file analytics.txtfunc GAParamInit() (MeasurementProtocolParam, error) {
func EventReceiver() error {
	GAResponseJSONObject = nil
	key, _ := ioutil.ReadFile("/home/daitya/key.json")
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
	GAResponse := response.Rows
	for i := range GAResponse {
		var label string
		var count string
		label = GAResponse[i][0]
		count = GAResponse[i][1]
		 object := GAResponseJSON {
			Label : label,
			Count : count,
		 }
		GAResponseJSONObject = append(GAResponseJSONObject, object)
	}
	if err != nil {
		return fmt.Errorf("Error while getting associated profiles, err: %s", err)
	}
	return nil
}
