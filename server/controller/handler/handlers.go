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
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gorilla/mux"
	"gopkg.in/yaml.v3"

	"github.com/litmuschaos/charthub.litmuschaos.io/server/pkg/analytics"
)

// ChaosChartPath refers the location of the freshly updated repository
var ChaosChartPath = os.Getenv("GOPATH") + "/src/github.com/litmuschaos/chaos-charts/"

func pathParser(w http.ResponseWriter, path string) {
	var fileLookedPath = ChaosChartPath + path
	dat, err := ioutil.ReadFile(fileLookedPath)
	checkIfError(err, "Path error")
	fmt.Fprintf(w, string(dat))

}

// GetAnalyticsData gets the data from GA instance
func GetAnalyticsData(w http.ResponseWriter, r *http.Request) {
	out, err := json.Marshal(analytics.GAResponseJSONObject)
	checkIfError(err, "unable to get data from GA instance %s")
	writeHeaders(&w, 200)
	w.Write(out)
}

// FileHandler takes out the file paths from the query params respectives URLs
func FileHandler(w http.ResponseWriter, r *http.Request) {
	keys, ok := r.URL.Query()["file"]
	if !ok || len(keys[0]) < 1 {
		return
	}
	key := keys[0]
	var path = string(key)
	log.Printf(path)
	pathParser(w, path)
}

// GetCharts is used to create list of YAML objects from charts' directories
func GetCharts(w http.ResponseWriter, r *http.Request) {
	files, err := filepath.Glob(ChaosChartPath + "charts/*")
	checkIfError(err, "reading file path failed %s")
	var charts []Chart
	for _, fileName := range files {
		chartPathSplitted := strings.Split(fileName, "/")
		charts = append(charts, getYAMLFileContent(chartPathSplitted[len(chartPathSplitted)-1]))
	}
	response, err := json.Marshal(charts)
	writeHeaders(&w, 200)
	fmt.Fprint(w, string(response))
}

// GetChart is used to create YAML objects from experiments' directories from the respective charts'
func GetChart(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	chart := getYAMLFileContent(vars["chartId"])
	response, err := json.Marshal(chart)
	responseStatusCode := 200
	if err != nil {
		responseStatusCode = 500
	}
	writeHeaders(&w, responseStatusCode)
	fmt.Fprint(w, string(response))
}

func getPackageInfo(chartName string)(Chart, PackageInformation, error){
	serviceFile, err := ioutil.ReadFile(ChaosChartPath + "charts/" + chartName + "/" + chartName + ".chartserviceversion.yaml")
	packageFile, err := ioutil.ReadFile(ChaosChartPath + "charts/" + chartName + "/" + chartName + ".package.yaml")
	checkIfError(err, ("file path of the error %s" + ChaosChartPath + "charts/" + chartName + "/" + chartName + ".chartserviceversion.yaml\n"+"serviceFile.Get err #%v "))
	var chart Chart
	var packageInfo PackageInformation
	log.Printf("package info %s", packageInfo)
	err = yaml.Unmarshal([]byte(serviceFile), &chart)
	err = yaml.Unmarshal([]byte(packageFile), &packageInfo)
	return chart, packageInfo, err
}

func checkIfError(err error, msg string) {
	if err != nil {
		log.Printf(msg, err)
	}
}

func getYAMLFileContent(chartName string) Chart {
	chart, packageInfo, err := getPackageInfo(chartName)
	chart.PackageInfo = packageInfo
	for _, experiment := range packageInfo.Experiments {
		experimentFile, err := ioutil.ReadFile(ChaosChartPath + "charts/" + chartName + "/" + experiment.Name + "/" + experiment.Name + ".chartserviceversion.yaml")
		checkIfError(err, "serviceFile.Get err #%v ")
		var experiment Chart
		err = yaml.Unmarshal([]byte(experimentFile), &experiment)
		chart.Experiments = append(chart.Experiments, experiment)
	}
	checkIfError(err, "serviceFile.Get err #%v ")
	return chart
}

func writeHeaders(w *http.ResponseWriter, statusCode int) {
	(*w).Header().Set("Content-Type", "application/json; charset=UTF-8")
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	(*w).WriteHeader(statusCode)
}
