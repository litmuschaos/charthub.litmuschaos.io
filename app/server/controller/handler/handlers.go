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
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
	"gopkg.in/yaml.v3"

	"github.com/litmuschaos/charthub.litmuschaos.io/app/server/pkg/analytics"
	"github.com/litmuschaos/charthub.litmuschaos.io/app/server/pkg/community"
)

// ChaosChartPath refers the location of the freshly updated repository
var ChaosChartPath = os.Getenv("GOPATH") + "/src/github.com/litmuschaos/charthub.litmuschaos.io/app/client/public/chaos-charts/"
var githubData = os.Getenv("GOPATH") + "/src/github.com/litmuschaos/charthub.litmuschaos.io/app/client/public/githubData/"

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

//GetIconHandler takes the experiment group and icon file required and returns the specific icon file
func GetIconHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	img, err := os.Open(ChaosChartPath + vars["version"]+"/charts/" + vars["expGroup"] + "/icons/" + vars["iconFile"])
	responseStatusCode := 200
	if err != nil {
		responseStatusCode = 500
		log.Error(err)
		fmt.Fprint(w, "icon cannot be fetched, err : "+err.Error())
	}
	defer img.Close()
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(responseStatusCode)
	w.Header().Set("Content-Type", "image/png") // <-- set the content-type header
	io.Copy(w, img)
}

//FileHandler takes out the file paths from the query params respectives URLs
func FileHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	filePath, ok := r.URL.Query()["file"]
	if !ok || len(filePath[0]) < 1 {
		return
	}
	fileContent, err := pathParser(vars["version"] + "/" + string(filePath[0]))
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
	filePath := ChaosChartPath + vars["version"] + "/charts/" + vars["chartId"]
	chart, err := getYAMLFileContent(filePath)
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

func readCSVFile(path string) (Chart, error) {
	var chart Chart
	csvFile, err := ioutil.ReadFile(path)
	if err != nil {
		return chart, fmt.Errorf("unable to read file, err: %+v", err)
	}
	err = yaml.Unmarshal([]byte(csvFile), &chart)
	return chart, err
}

func readPackageFile(path string) (PackageInformation, error) {
	var packageInfo PackageInformation
	packageFile, err := ioutil.ReadFile(path)
	if err != nil {
		return packageInfo, fmt.Errorf("file path of the,err: %+v", err)
	}
	log.Printf("package info %s", packageInfo)
	err = yaml.Unmarshal([]byte(packageFile), &packageInfo)
	return packageInfo, err
}

func readExperimentFile(path string) (Chart, error) {
	var experiment Chart
	experimentFile, err := ioutil.ReadFile(path)
	if err != nil {
		return experiment, fmt.Errorf("file path of the, err: %+v", err)
	}
	if yaml.Unmarshal([]byte(experimentFile), &experiment) != nil {
		return experiment, err
	}
	return experiment, nil
}
func getYAMLFileContent(fileLocation string) (Chart, error) {
	chartPathSplitted := strings.Split(fileLocation, "/")
	CSVFilePath := fileLocation + "/" + chartPathSplitted[len(chartPathSplitted)-1] + ".chartserviceversion.yaml"
	packageFilePath := fileLocation + "/" + chartPathSplitted[len(chartPathSplitted)-1] + ".package.yaml"
	chart, err := readCSVFile(CSVFilePath)
	if err != nil {
		return chart, err
	}
	packageInfo, err := readPackageFile(packageFilePath)
	if err != nil {
		return chart, err
	}
	chart.PackageInfo = packageInfo
	for _, exp := range packageInfo.Experiments {
		experimentFilePath := fileLocation + "/" + exp.Name + "/" + exp.Name + ".chartserviceversion.yaml"
		experiment, err := readExperimentFile(experimentFilePath)
		if err != nil {
			log.Error(err)
		}
		chart.Experiments = append(chart.Experiments, experiment)
	}
	return chart, nil
}

// GetCharts is used to create list of YAML objects from charts' directories
func GetCharts(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	files, err := filepath.Glob(ChaosChartPath + vars["version"] + "/charts/*")
	if err != nil {
		log.Error(err)
	}
	var charts []Chart
	for _, fileName := range files {
		chart, err := getYAMLFileContent(fileName)
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

// GetChartVersion will return the available version of chaos-chart
func GetChartVersion(w http.ResponseWriter, r *http.Request) {
	version, err := ioutil.ReadFile("/tmp/version.json")
	if err != nil {
		log.Error(err)
		return
	}
	writeHeaders(&w, 200)
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Fprint(w, string(version))
}

func writeHeaders(w *http.ResponseWriter, statusCode int) {
	(*w).Header().Set("Content-Type", "application/json; charset=UTF-8")
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	(*w).WriteHeader(statusCode)
}

// GetGithubRepoData will return the github repo data for litmus
func GetGithubRepoData(w http.ResponseWriter, r *http.Request) {
	response, err := ioutil.ReadFile(githubData + "githubRepoData.json")
	responseStatusCode := 200
	if err != nil {
		responseStatusCode = 500
		fmt.Errorf("unable to read file, error: %v", err)
	}
	writeHeaders(&w, responseStatusCode)
	fmt.Fprint(w, string(response))
}

// GetCommunityAnalyticsData returns all the analytics data related to the community
func GetCommunityAnalyticsData(w http.ResponseWriter, r *http.Request) {
	data, err := community.GetAnalytics()
	responseStatusCode := 200
	if err != nil {
		log.Error(err)
		responseStatusCode = 500
		fmt.Fprint(w, "unable to get community analytics data, err : "+err.Error())
	}
	writeHeaders(&w, responseStatusCode)
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(data)
}
