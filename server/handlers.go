package main

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
	// "gopkg.in/src-d/go-git.v4"
	// . "gopkg.in/src-d/go-git.v4/_examples"
	"gopkg.in/yaml.v3"
)

var chartsLocation = os.Getenv("GOPATH") + "/src/github.com/litmuschaos/charthub.litmuschaos.io/server/"

func CheckIfError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func pathParser(w http.ResponseWriter, path string) {
	var fileLookedPath = chartsLocation + path
	dat, err := ioutil.ReadFile(fileLookedPath)
	CheckIfError(err)
	fmt.Fprintf(w, string(dat))

}

// TODO
// func triggerCloning() {

// 	_, _ = git.PlainClone(repoPath, false, &git.CloneOptions{
// 		URL:      "https://github.com/litmuschaos/chaos-charts",
// 		Progress: os.Stdout,
// 	})

// }

// TODO
// func triggerUpdate() {

// 	// We instantiate a new repository targeting the given path (the .git folder)
// 	r, err := git.PlainOpen(repoPath)
// 	CheckIfError(err)

// 	// Get the working directory for the repository
// 	w, err := r.Worktree()
// 	CheckIfError(err)

// 	// Pull the latest changes from the origin remote and merge into the current branch
// 	Info("git pull origin")
// 	err = w.Pull(&git.PullOptions{RemoteName: "origin"})
// 	CheckIfError(err)

// }

func fileHandler(w http.ResponseWriter, r *http.Request) {

	keys, ok := r.URL.Query()["key"]

	if !ok || len(keys[0]) < 1 {
		return
	}
	key := keys[0]

	var path = string(key)
	pathParser(w, path)
}

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
	for _, experiment := range packageInfo.Experiments {
		experimentPath := "./charts/" + chartName + "/" + experiment.Name + "/" + experiment.Name + ".chartserviceversion.yaml"
		experimentFile, err := ioutil.ReadFile(experimentPath)
		if err != nil {
			log.Printf("serviceFile.Get err #%v ", err)
		}
		var experiment Chart
		err = yaml.Unmarshal([]byte(experimentFile), &experiment)
		chart.Experiments = append(chart.Experiments, experiment)
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
