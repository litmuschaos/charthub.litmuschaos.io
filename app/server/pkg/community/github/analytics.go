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
	githubApi    = "https://api.github.com/repos/"
	organization = "litmuschaos"
)

type GithubData struct {
	Stars           string `json:"stars"`
	ExperimentCount string `json:"experimentsCount"`
}

var Github GithubData

// Handler is responsible for the looping the UpdateGithubData()
func Handler() {
	for true {
		log.Infof("Updating github litmus repository data...")
		err := updateGithubStars()
		if err != nil {
			log.Error(err)
		}
		err = updateExpCount()
		if err != nil {
			log.Error(err)
		}
		log.Infof("Github litmus repository data updated...")
		time.Sleep(timeInterval)
	}
}

//updateGithubStars will get the github stars count for litmus repository using github APIs
func updateGithubStars() error {
	response, err := http.Get(githubApi + organization + "/" + repoName)
	if err != nil {
		return fmt.Errorf("error while getting github star data, err :%s", err)
	}
	data, error := ioutil.ReadAll(response.Body)
	if error != nil {
		return fmt.Errorf("error while getting github star data, err :%s", error)
	}
	var githubD map[string]interface{}
	err = json.Unmarshal(data, &githubD)
	if err != nil {
		return fmt.Errorf("error while getting github star data, err :%s", err)
	}
	Github.Stars = fmt.Sprintf("%v", githubD["stargazers_count"])
	return nil
}

//updateExpCount updates will get the chaos experiment count from chaos-charts repo
func updateExpCount() error {
	response, err := http.Get(githubApi + organization + "/chaos-charts/contents/charts")
	if err != nil {
		return fmt.Errorf("error while getting experiment count, err :%s", err)
	}
	data, _ := ioutil.ReadAll(response.Body)
	var dir []map[string]interface{}
	err = json.Unmarshal(data, &dir)
	if err != nil {
		return fmt.Errorf("error while getting experiment count, err :%s", err)
	}
	count := 0
	for _, dirD := range dir {
		if dirD["type"].(string) == "dir" {
			response, err = http.Get(githubApi + organization + "/chaos-charts/contents/charts/" + dirD["name"].(string))
			if err != nil {
				return fmt.Errorf("error while getting experiment count, err :%s", err)
			}
			data, error := ioutil.ReadAll(response.Body)
			if error != nil {
				return fmt.Errorf("error while getting experiment count, err :%s", error)
			}
			var exp []map[string]interface{}
			err = json.Unmarshal(data, &exp)
			if err != nil {
				return fmt.Errorf("error while getting experiment count, err :%s", err)
			}
			for _, expD := range exp {
				if expD["type"].(string) == "dir" && expD["name"].(string) != "icons" {
					count++
				}
			}
		}
	}
	Github.ExperimentCount = fmt.Sprintf("%v", count)
	return nil
}
