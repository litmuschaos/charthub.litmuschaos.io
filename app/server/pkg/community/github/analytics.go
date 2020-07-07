package github

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	log "github.com/sirupsen/logrus"
)

const (
	timeInterval = 1 * time.Hour
	repoName     = "litmus"
)

type GithubData struct{
	Stars string `json:"stars"`
	ExperimentCount string `json:"experiment-count"`
}

var Github GithubData

// Handler is responsible for the looping the UpdateGithubData()
func Handler() {
	for true {
		log.Infof("Updating Github Litmus Repo Data ...")
		err := UpdateGithubStars()
		if err != nil {
			log.Error(err)
		}
		err = UpdateExpCount()
		if err != nil {
			log.Error(err)
		}
		log.Infof("Updated Github Litmus Repo Data...")
		time.Sleep(timeInterval)
	}
}

//UpdateGithubStars updates github star count for litmus repo, makes a get request to the public APIs
//of github to fetch repo stars
func UpdateGithubStars() error {
	response, err := http.Get("https://api.github.com/repos/litmuschaos/" + repoName)
	if err != nil {
		return fmt.Errorf("error while getting github star data, err :%s", err)
	}
	data, _ := ioutil.ReadAll(response.Body)
	var githubD map[string]interface{}
	err = json.Unmarshal(data,&githubD)
	if err!=nil{
		return fmt.Errorf("error while getting github star data, err :%s", err)
	}
	Github.Stars = fmt.Sprintf("%v", githubD["stargazers_count"])
	return nil
}
//UpdateExpCount updates github experiment count for litmus repo, makes a get request to the public APIs
//of github to fetch experiments dirs
func UpdateExpCount() error {
	response, err := http.Get("https://api.github.com/repos/litmuschaos/chaos-charts/contents/charts")
	if err != nil {
		return fmt.Errorf("error while getting experiment count, err :%s", err)
	}
	data, _ := ioutil.ReadAll(response.Body)
	var dir []map[string]interface{}
	err = json.Unmarshal(data,&dir)
	if err!=nil{
		return fmt.Errorf("error while getting experiment count, err :%s", err)
	}
	count:=0
	for _,dirD:=range dir{
		if dirD["type"].(string)=="dir"{
			response, err = http.Get("https://api.github.com/repos/litmuschaos/chaos-charts/contents/charts/"+dirD["name"].(string))
			if err != nil {
				return fmt.Errorf("error while getting experiment count, err :%s", err)
			}
			data, _ = ioutil.ReadAll(response.Body)
			var exp []map[string]interface{}
			err = json.Unmarshal(data,&exp)
			if err!=nil{
				return fmt.Errorf("error while getting experiment count, err :%s", err)
			}
			for _,expD:=range exp {
				if expD["type"].(string)=="dir" && expD["name"].(string)!="icons"{
					count++
				}
			}
		}
	}
	Github.ExperimentCount=fmt.Sprintf("%v", count)
	return nil
}
