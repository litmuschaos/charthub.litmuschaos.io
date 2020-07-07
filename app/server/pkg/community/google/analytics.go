package google

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
	timeInterval = 30 * time.Minute
	viewID       = "ga:208521052"
	startDate    = "2019-12-01"
	endDate      = "today"
	filters      = "ga:eventCategory!=key1"
	base         = 10
	bitSize      = 64
)
type CommGAResponse struct{
	TotalRuns string `json:"total-runs"`
	OpInstalls string `json:"operator-installs"`
	CityData [][]string `json:"geo-city"`
	CountryData [][]string `json:"geo-country"`
	DailyData [][]string `json:"daily-data"`
}
// GAResponseJSONObject is the array of GAResponse struct
var GAResponseJSONObject CommGAResponse

// Handler is responsible for the looping the UpdateAnalyticsData()
func Handler() {
	for true {
		log.Infof("Updating Google Analytics Data ...")
		err := getGraphData()
		if err != nil {
			log.Error(err)
		}
		err = getTotalCounts()
		if err != nil {
			log.Error(err)
		}
		log.Infof("Updated Google Analytics Data ...")
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
func getTotalCounts() error {
	httpClient, err := getterJWTConfig()
	if err != nil {
		return fmt.Errorf("error while getting HTTPclient, err :%s", err)
	}
	svc, err := getterSVC(httpClient)
	if err != nil {
		return fmt.Errorf("error while getting service account, err :%s", err)
	}
	response, err := svc.Data.Ga.Get(viewID, startDate, endDate, "ga:totalEvents").Dimensions("ga:eventLabel").Filters(filters).Do()
	if err != nil {
		return fmt.Errorf("Error while getting response, err: %s", err)
	}
	var totalCount int
	GAResponse := response.Rows
	for i := range GAResponse {
		if GAResponse[i][0] != "pod-delete-sa1xml" && GAResponse[i][0] != "pod-delete-s3onwz" && GAResponse[i][0] != "pod-delete-g85e2f" && GAResponse[i][0] != "drain-node" {
			if GAResponse[i][0] != "Chaos-Operator" {
				count, err:= strconv.Atoi(GAResponse[i][1])
				if err != nil {
					return fmt.Errorf("Error while converting count to string, err: %s", err)
				}
				totalCount = totalCount + count
			}
			if GAResponse[i][0] == "Chaos-Operator" {
				GAResponseJSONObject.OpInstalls = string(GAResponse[i][1])
			}
		}
	}
	GAResponseJSONObject.TotalRuns= strconv.Itoa(totalCount)
	return nil
}

func getGraphData() error {
	httpClient, err := getterJWTConfig()
	if err != nil {
		return fmt.Errorf("error while getting HTTPclient, err :%s", err)
	}
	svc, err := getterSVC(httpClient)
	if err != nil {
		return fmt.Errorf("error while getting service account, err :%s", err)
	}
	response, err := svc.Data.Ga.Get(viewID, startDate, endDate, "ga:users").Dimensions("ga:country").Filters(filters).Do()
	if err != nil {
		return fmt.Errorf("Error while getting response, err: %s", err)
	}
	GAResponseJSONObject.CountryData=response.Rows
	response, err = svc.Data.Ga.Get(viewID, startDate, endDate, "ga:users").Dimensions("ga:city").Filters(filters).Do()
	if err != nil {
		return fmt.Errorf("Error while getting response, err: %s", err)
	}
	GAResponseJSONObject.CityData=response.Rows
	response, err = svc.Data.Ga.Get(viewID, startDate, endDate, "ga:totalEvents").Dimensions("ga:date").Filters(filters).Do()
	if err != nil {
		return fmt.Errorf("Error while getting response, err: %s", err)
	}
	dailyData:=response.Rows
	for i,val:=range dailyData{
		dailyData[i][0]=val[0][:4]+"-"+val[0][4:6]+"-"+val[0][6:]
	}
	GAResponseJSONObject.DailyData=dailyData
	return nil
}