/*
Copyright 2019 LitmusChaos Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package handler

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
	"gopkg.in/yaml.v3"

	"github.com/litmuschaos/charthub.litmuschaos.io/server/pkg/analytics"
)

// ChaosChartPath refers the location of the freshly updated repository
var ChaosChartPath = os.Getenv("GOPATH") + "/src/github.com/litmuschaos/chaos-charts/"

/*	pathParser reads the path in the csv file <path> forms the system-path <fileLookedPath>
	and returns the file
*/
func pathParser(path string) ([]byte, error) {
	var fileLookedPath = ChaosChartPath + path
	file, err := ioutil.ReadFile(fileLookedPath)
	if err != nil {
		return nil, fmt.Errorf("path err %v", err)
	}
	return file, nil
}

//FileHandler takes out the file paths from the query params respectives URLs 
func FileHandler(w http.ResponseWriter, r *http.Request) {

	keys, ok := r.URL.Query()["file"]
	if !ok || len(keys[0]) < 1 {
		return
	}
	key := keys[0]
	var path = string(key)
	file, err := pathParser(path)
	if err != nil {
		log.Error(err)
	}
	fmt.Fprintf(w, string(file))
}

// GetAnalyticsData gets the data from GA instance
func GetAnalyticsData(w http.ResponseWriter, r *http.Request) {
	out, err := json.Marshal(analytics.GAResponseJSONObject)
	if err != nil {
		log.Error(err)
	}
	writeHeaders(&w, 200)
	w.Write(out)
}

// GetChart is used to create YAML objects from experiments' directories from the respective charts'
func GetChart(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	chart, err := getYAMLFileContent(vars["chartId"])
	response, err := json.Marshal(chart)
	responseStatusCode := 200
	if err != nil {
		responseStatusCode = 500
	}
	writeHeaders(&w, responseStatusCode)
	fmt.Fprint(w, string(response))
}

func getCSVFile(chartName string) (Chart, error) {
	csvFile, err := ioutil.ReadFile(ChaosChartPath + "charts/" + chartName + "/" + chartName + ".chartserviceversion.yaml")
	checkIfError(err, "file path of the error %s"+ChaosChartPath+"charts/"+chartName+"/"+chartName+".chartserviceversion.yaml\n"+"serviceFile.Get")
	var chart Chart
	err = yaml.Unmarshal([]byte(csvFile), &chart)
	return chart, err
}

func getPackageInfo(chartName string) (PackageInformation, error) {
	packageFile, err := ioutil.ReadFile(ChaosChartPath + "charts/" + chartName + "/" + chartName + ".package.yaml")
	checkIfError(err, "file path of the error %s"+ChaosChartPath+"charts/"+chartName+"/"+chartName+".chartserviceversion.yaml\n"+"serviceFile.Get")
	var packageInfo PackageInformation
	log.Printf("package info %s", packageInfo)
	err = yaml.Unmarshal([]byte(packageFile), &packageInfo)
	return packageInfo, err
}

func checkIfError(err error, msg string) {
	if err != nil {
		log.Fatalf(msg, err)
	}
}
func getExpUnmarshal(chartName string, expName string) (Chart, error) {
	experimentFile, err := ioutil.ReadFile(ChaosChartPath + "charts/" + chartName + "/" + expName + "/" + expName + ".chartserviceversion.yaml")
	checkIfError(err, "serviceFile.Get err #%v ")
	var experiment Chart
	if yaml.Unmarshal([]byte(experimentFile), &experiment) != nil {
		return experiment, err
	}
	return experiment, nil
}
func getYAMLFileContent(chartName string) (Chart, error) {
	chart, err := getCSVFile(chartName)
	if err != nil {
		return chart, err
	}
	packageInfo, err := getPackageInfo(chartName)
	if err != nil {
		return chart, err
	}
	chart.PackageInfo = packageInfo
	for _, exp := range packageInfo.Experiments {
		experiment, err := getExpUnmarshal(chartName, exp.Name)
		if err != nil {
			checkIfError(err, "serviceFile.Get err #%v ")
		}
		chart.Experiments = append(chart.Experiments, experiment)
	}
	return chart, nil
}

// GetCharts is used to create list of YAML objects from charts' directories
func GetCharts(w http.ResponseWriter, r *http.Request) {
	files, err := filepath.Glob(ChaosChartPath + "charts/*")
	if err != nil {
		log.Error(err)
	}
	var charts []Chart
	for _, fileName := range files {
		chartPathSplitted := strings.Split(fileName, "/")
		chart, err := getYAMLFileContent(chartPathSplitted[len(chartPathSplitted)-1])
		if err != nil {
			log.Error(err)
		}
		charts = append(charts, chart)
	}
	response, err := json.Marshal(charts)
	writeHeaders(&w, 200)
	fmt.Fprint(w, string(response))
}

func writeHeaders(w *http.ResponseWriter, statusCode int) {
	(*w).Header().Set("Content-Type", "application/json; charset=UTF-8")
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	(*w).WriteHeader(statusCode)
}
