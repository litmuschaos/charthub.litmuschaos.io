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
	timeInterval = 1 * time.Hour
	viewID       = "ga:208521052"
	startDate    = "2019-12-01"
	endDate      = "today"
	filters      = "ga:eventCategory!=key1"
)

//CommunityGAResponse A struct for storing Analytics for Litmus Community
type CommunityGAResponse struct {
	TotalRuns             string     `json:"totalRuns"`
	OpInstalls            string     `json:"operatorInstalls"`
	CityData              [][]string `json:"geoCity"`
	CountryData           [][]string `json:"geoCountry"`
	DailyOperatorData     [][]string `json:"dailyOperatorData"`
	DailyExperimentData   [][]string `json:"dailyExperimentData"`
	MonthlyOperatorData   [][]string `json:"monthlyOperatorData"`
	MonthlyExperimentData [][]string `json:"monthlyExperimentData"`
}

// GAResponseJSONObject is an instance of CommunityGAResponse struct
var GAResponseJSONObject CommunityGAResponse

// Handler is responsible for syncing the latest analytics data
func Handler() {
	for true {
		log.Infof("Updating google analytics data ...")
		err := getTotalCounts()
		if err != nil {
			log.Error(err)
		}
		err = getGraphData()
		if err != nil {
			log.Error(err)
		}
		log.Infof("Google analytics data updated ...")
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

// getTotalCounts will get the Total Experiment Run and Chaos Operator Install Count
func getTotalCounts() error {
	httpClient, err := getterJWTConfig()
	if err != nil {
		return fmt.Errorf("error while getting HTTPclient, err :%s", err)
	}
	svc, err := getterSVC(httpClient)
	if err != nil {
		return fmt.Errorf("error while getting service account, err :%s", err)
	}
	response, err := svc.Data.Ga.Get(viewID, startDate, endDate, "ga:totalEvents").Dimensions("ga:eventLabel").Filters(filters).MaxResults(10000).Do()
	if err != nil {
		return fmt.Errorf("Error while getting response, err: %s", err)
	}
	var totalCount int
	GAResponse := response.Rows
	for i := range GAResponse {
		if GAResponse[i][0] != "pod-delete-sa1xml" && GAResponse[i][0] != "pod-delete-s3onwz" && GAResponse[i][0] != "pod-delete-g85e2f" && GAResponse[i][0] != "drain-node" {
			if GAResponse[i][0] != "Chaos-Operator" {
				count, err := strconv.Atoi(GAResponse[i][1])
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
	GAResponseJSONObject.TotalRuns = strconv.Itoa(totalCount)
	return nil
}

// getGraphData will get the analytics data required for Geographic Plot and Time Series Plots.
func getGraphData() error {
	httpClient, err := getterJWTConfig()
	if err != nil {
		return fmt.Errorf("error while getting HTTPclient, err :%s", err)
	}
	svc, err := getterSVC(httpClient)
	if err != nil {
		return fmt.Errorf("error while getting service account, err :%s", err)
	}
	response, err := svc.Data.Ga.Get(viewID, startDate, endDate, "ga:users").Dimensions("ga:country").Filters(filters).MaxResults(10000).Do()
	if err != nil {
		return fmt.Errorf("Error while getting response, err: %s", err)
	}
	GAResponseJSONObject.CountryData = response.Rows
	response, err = svc.Data.Ga.Get(viewID, startDate, endDate, "ga:users").Dimensions("ga:city,ga:latitude, ga:longitude").Filters(filters).MaxResults(10000).Do()
	if err != nil {
		return fmt.Errorf("Error while getting response, err: %s", err)
	}
	GAResponseJSONObject.CityData = response.Rows

	response, err = svc.Data.Ga.Get(viewID, startDate, endDate, "ga:totalEvents").Dimensions("ga:date").Filters(filters).Filters("ga:eventLabel==Chaos-Operator").MaxResults(999999999).Do()
	if err != nil {
		return fmt.Errorf("Error while getting response, err: %s", err)
	}
	dailyOperatorData := response.Rows
	for i, val := range dailyOperatorData {
		dailyOperatorData[i][0] = val[0][:4] + "-" + val[0][4:6] + "-" + val[0][6:]
	}
	GAResponseJSONObject.DailyOperatorData = dailyOperatorData

	response, err = svc.Data.Ga.Get(viewID, startDate, endDate, "ga:totalEvents").Dimensions("ga:date").Filters(filters).Filters("ga:eventLabel!=Chaos-Operator").MaxResults(999999999).Do()
	if err != nil {
		return fmt.Errorf("Error while getting response, err: %s", err)
	}
	dailyExperimentData := response.Rows
	for i, val := range dailyExperimentData {
		dailyExperimentData[i][0] = val[0][:4] + "-" + val[0][4:6] + "-" + val[0][6:]
	}
	GAResponseJSONObject.DailyExperimentData = dailyExperimentData

	response, err = svc.Data.Ga.Get(viewID, startDate, endDate, "ga:totalEvents").Dimensions("ga:yearMonth").Filters(filters).Filters("ga:eventLabel==Chaos-Operator").MaxResults(999999999).Do()
	if err != nil {
		return fmt.Errorf("Error while getting response, err: %s", err)
	}
	monthlyOperatorData := response.Rows
	for i, val := range monthlyOperatorData {
		if val[0][4:6] == "01" || val[0][4:6] == "03" || val[0][4:6] == "05" || val[0][4:6] == "07" || val[0][4:6] == "08" || val[0][4:6] == "10" || val[0][4:6] == "12" {
			monthlyOperatorData[i][0] = val[0][:4] + "-" + val[0][4:6] + "-31"
		}
		if val[0][4:6] == "04" || val[0][4:6] == "06" || val[0][4:6] == "09" || val[0][4:6] == "11" {
			monthlyOperatorData[i][0] = val[0][:4] + "-" + val[0][4:6] + "-30"
		}
		if val[0][4:6] == "02" {
			monthlyOperatorData[i][0] = val[0][:4] + "-" + val[0][4:6] + "-28"
		}
	}
	GAResponseJSONObject.MonthlyOperatorData = monthlyOperatorData

	response, err = svc.Data.Ga.Get(viewID, startDate, endDate, "ga:totalEvents").Dimensions("ga:yearMonth").Filters(filters).Filters("ga:eventLabel!=Chaos-Operator").MaxResults(999999999).Do()
	if err != nil {
		return fmt.Errorf("Error while getting response, err: %s", err)
	}
	monthlyExperimentData := response.Rows
	for i, val := range monthlyExperimentData {
		if val[0][4:6] == "01" || val[0][4:6] == "03" || val[0][4:6] == "05" || val[0][4:6] == "07" || val[0][4:6] == "08" || val[0][4:6] == "10" || val[0][4:6] == "12" {
			monthlyExperimentData[i][0] = val[0][:4] + "-" + val[0][4:6] + "-31"
		}
		if val[0][4:6] == "04" || val[0][4:6] == "06" || val[0][4:6] == "09" || val[0][4:6] == "11" {
			monthlyExperimentData[i][0] = val[0][:4] + "-" + val[0][4:6] + "-30"
		}
		if val[0][4:6] == "02" {
			monthlyExperimentData[i][0] = val[0][:4] + "-" + val[0][4:6] + "-28"
		}
	}
	GAResponseJSONObject.MonthlyExperimentData = monthlyExperimentData

	return nil
}
