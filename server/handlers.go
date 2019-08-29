package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"log"
	"net/http"
	"path/filepath"
	"strings"
)

func GetCharts(w http.ResponseWriter, r *http.Request) {
	files, err := filepath.Glob("charts/*")
	if err != nil {
		log.Printf("reading file path failed", err)
	}
	var charts []Chart
	for _, fileName := range files {
		chartName := strings.Split(fileName, "/")[1]
		chart := getYAMLFileContent(chartName)
		charts = append(charts, chart)
	}
	response, err := json.Marshal(charts)
	writeHeaders(&w, 200)
	fmt.Fprint(w, string(response))
}

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

func getYAMLFileContent(chartName string) Chart {
	chartServicePath := "./charts/" + chartName + "/" + chartName + ".chartserviceversion.yaml"
	serviceFile, err := ioutil.ReadFile(chartServicePath)
	packagePath := "./charts/" + chartName + "/" + chartName + ".package.yaml"
	packageFile, err := ioutil.ReadFile(packagePath)
	if err != nil {
		log.Printf("file path of the error", chartServicePath)
		log.Printf("serviceFile.Get err #%v ", err)
	}
	var chart Chart
	var packageInfo PackageInformation
	log.Printf("package info", packageInfo)
	err = yaml.Unmarshal([]byte(serviceFile), &chart)
	err = yaml.Unmarshal([]byte(packageFile), &packageInfo)
	chart.PackageInfo = packageInfo
	for _, subChart := range packageInfo.Subcharts {
		subChartPath := "./charts/" + chartName + "/" + subChart.Name + "/" + subChart.Name +".chartserviceversion.yaml"
		subChartFile, err := ioutil.ReadFile(subChartPath)
		if err != nil {
			log.Printf("serviceFile.Get err #%v ", err)
		}
		var subChart Chart
		err = yaml.Unmarshal([]byte(subChartFile), &subChart)
		chart.SubCharts = append(chart.SubCharts, subChart)
	}
	if err != nil {
		log.Printf("serviceFile.Get err #%v ", err)
	}
	return chart
}

func writeHeaders(w *http.ResponseWriter, statusCode int) {
	(*w).Header().Set("Content-Type", "application/json; charset=UTF-8")
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	(*w).WriteHeader(statusCode)
}
