package main

import (
    "encoding/json"
    "fmt"
    "log"
    "path/filepath"
    "gopkg.in/yaml.v2"
    "net/http"
    "bytes"
    "strings"
		"io/ioutil"
)

func GetCharts(w http.ResponseWriter, r * http.Request) {
    files, err := filepath.Glob("charts/*")
    if err != nil {
      log.Printf("reading file path failed", err)
    }
    var charts []Chart
    for _, fileName := range files {
				var filePathBuffer bytes.Buffer
        chartName := strings.Split(fileName, "/")[1]
				filePathBuffer.WriteString("./charts/")
				filePathBuffer.WriteString(chartName)
				filePathBuffer.WriteString("/")
				filePathBuffer.WriteString(chartName)
				filePathBuffer.WriteString(".chartserviceversion.yaml")
        yamlFile, err := ioutil.ReadFile(filePathBuffer.String())
        if err != nil {
            log.Printf("yamlFile.Get err #%v ", err)
        }
				var chart Chart
				err = yaml.Unmarshal([]byte(yamlFile), &chart)
        if err != nil {
            log.Printf("yamlFile.Get err #%v ", err)
        }
        charts = append(charts, chart)
    }
    w.Header().Set("Content-Type", "application/json; charset=UTF-8")
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
    w.WriteHeader(http.StatusOK)
    response, err := json.Marshal(charts)
    fmt.Fprint(w, string(response))
}
