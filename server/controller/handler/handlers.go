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
var ChaosChartPath = os.Getenv("GOPATH") + "/src/github.com/litmuschaos/charthub.litmuschaos.io/public/chaos-charts/"

/*	pathParser reads the path in the csv file <path> forms the system-path <fileLookedPath>
	and returns the file
*/
func pathParser(path string) ([]byte, error) {
	var fileLookedPath = ChaosChartPath + path
	fileContent, err := ioutil.ReadFile(fileLookedPath)
	if err != nil {
		return nil, fmt.Errorf("unable to read file, error: %v", err)
	}
	return fileContent, nil
}

//FileHandler takes out the file paths from the query params respectives URLs
func FileHandler(w http.ResponseWriter, r *http.Request) {

	filePath, ok := r.URL.Query()["file"]
	if !ok || len(filePath[0]) < 1 {
		return
	}
	fileContent, err := pathParser(string(filePath[0]))
	if err != nil {
		log.Error(err)
		fmt.Fprint(w, "file content parsing error, err : "+err.Error())
	}
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Fprintf(w, string(fileContent))
}

// GetAnalyticsData gets the data from GA instance
func GetAnalyticsData(w http.ResponseWriter, r *http.Request) {
	out, err := json.Marshal(analytics.GAResponseJSONObject)
	responseStatusCode := 200
	if err != nil {
		log.Error(err)
		responseStatusCode = 500
		fmt.Fprint(w, "unable to get analytics data, err : "+err.Error())
	}
	writeHeaders(&w, responseStatusCode)
	(w).Header().Set("Access-Control-Allow-Origin", "*")
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
		fmt.Fprint(w, "chart retrieval error, err : "+err.Error())
	}
	writeHeaders(&w, responseStatusCode)
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Fprint(w, string(response))
}

func getCSVFile(chartName string) (Chart, error) {
	var chart Chart
	csvFile, err := ioutil.ReadFile(ChaosChartPath + "charts/" + chartName + "/" + chartName + ".chartserviceversion.yaml")
	if err != nil {
		return chart, fmt.Errorf("file path of the error "+ChaosChartPath+"charts/"+chartName+"/"+chartName+".chartserviceversion.yaml\n"+"serviceFile.Get, err:", err)
	}
	err = yaml.Unmarshal([]byte(csvFile), &chart)
	return chart, err
}

func getPackageInfo(chartName string) (PackageInformation, error) {
	var packageInfo PackageInformation
	packageFile, err := ioutil.ReadFile(ChaosChartPath + "charts/" + chartName + "/" + chartName + ".package.yaml")
	if err != nil {
		return packageInfo, fmt.Errorf("file path of the error "+ChaosChartPath+"charts/"+chartName+"/"+chartName+".chartserviceversion.yaml\n"+"serviceFile.Get, err:", err)
	}
	log.Printf("package info %s", packageInfo)
	err = yaml.Unmarshal([]byte(packageFile), &packageInfo)
	return packageInfo, err
}

func getExpUnmarshal(chartName string, expName string) (Chart, error) {
	var experiment Chart
	experimentFile, err := ioutil.ReadFile(ChaosChartPath + "charts/" + chartName + "/" + expName + "/" + expName + ".chartserviceversion.yaml")
	if err != nil {
		return experiment, fmt.Errorf("file path of the error "+ChaosChartPath+"charts/"+chartName+"/"+chartName+".chartserviceversion.yaml\n"+"serviceFile.Get, err:", err)
	}
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
			return chart, fmt.Errorf("file path of the error "+ChaosChartPath+"charts/"+chartName+"/"+chartName+".chartserviceversion.yaml\n"+"serviceFile.Get, err:", err)
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
			fmt.Fprint(w, "file content yaml conversion error, err : "+err.Error())
		}
		charts = append(charts, chart)
	}
	response, err := json.Marshal(charts)
	if err != nil {
		fmt.Fprint(w, "chart marshalling error, err : "+err.Error())
	}
	writeHeaders(&w, 200)
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Fprint(w, string(response))
}

func writeHeaders(w *http.ResponseWriter, statusCode int) {
	(*w).Header().Set("Content-Type", "application/json; charset=UTF-8")
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	(*w).WriteHeader(statusCode)
}
