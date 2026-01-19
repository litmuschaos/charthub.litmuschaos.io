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
	for {
		func() {
			defer func() {
				if r := recover(); r != nil {
					log.Errorf("Recovered from panic in community github Handler: %v", r)
				}
			}()
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
		}()
		time.Sleep(timeInterval)
	}
}

// updateGithubStars will get the github stars count for litmus repository using github APIs
func updateGithubStars() error {
	response, err := http.Get(githubApi + organization + "/" + repoName)
	if err != nil {
		return fmt.Errorf("error while getting github star data, err :%s", err)
	}
	defer response.Body.Close()
	if response.StatusCode != http.StatusOK {
		return fmt.Errorf("GitHub API returned non-OK status: %d", response.StatusCode)
	}
	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return fmt.Errorf("error while getting github star data, err :%s", err)
	}
	var githubD map[string]interface{}
	err = json.Unmarshal(data, &githubD)
	if err != nil {
		return fmt.Errorf("error while getting github star data, err :%s", err)
	}
	starCount, ok := githubD["stargazers_count"]
	if !ok {
		return fmt.Errorf("stargazers_count field not found in GitHub API response")
	}
	Github.Stars = fmt.Sprintf("%v", starCount)
	return nil
}

// updateExpCount updates will get the chaos experiment count from chaos-charts repo
func updateExpCount() error {
	response, err := http.Get(githubApi + organization + "/chaos-charts/contents/faults")
	if err != nil {
		return fmt.Errorf("error while getting experiment count, err :%s", err)
	}
	defer response.Body.Close()
	if response.StatusCode != http.StatusOK {
		return fmt.Errorf("GitHub API returned non-OK status: %d", response.StatusCode)
	}
	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return fmt.Errorf("error while reading response body, err :%s", err)
	}
	var dir []map[string]interface{}
	err = json.Unmarshal(data, &dir)
	if err != nil {
		return fmt.Errorf("error while getting experiment count, err :%s", err)
	}
	count := 0
	for _, dirD := range dir {
		typeVal, typeOk := dirD["type"].(string)
		nameVal, nameOk := dirD["name"].(string)
		if !typeOk || !nameOk {
			continue
		}
		if typeVal == "dir" {
			expCount, err := getExperimentCountForDir(nameVal)
			if err != nil {
				return err
			}
			count += expCount
		}
	}
	Github.ExperimentCount = fmt.Sprintf("%v", count)
	return nil
}

// getExperimentCountForDir fetches and counts experiments in a specific fault directory
func getExperimentCountForDir(dirName string) (int, error) {
	response, err := http.Get(githubApi + organization + "/chaos-charts/contents/faults/" + dirName)
	if err != nil {
		return 0, fmt.Errorf("error while getting experiment count, err :%s", err)
	}
	defer response.Body.Close()
	if response.StatusCode != http.StatusOK {
		return 0, fmt.Errorf("GitHub API returned non-OK status: %d", response.StatusCode)
	}
	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return 0, fmt.Errorf("error while reading response body, err :%s", err)
	}
	var exp []map[string]interface{}
	err = json.Unmarshal(data, &exp)
	if err != nil {
		return 0, fmt.Errorf("error while getting experiment count, err :%s", err)
	}
	count := 0
	for _, expD := range exp {
		typeVal, typeOk := expD["type"].(string)
		nameVal, nameOk := expD["name"].(string)
		if !typeOk || !nameOk {
			continue
		}
		if typeVal == "dir" && nameVal != "icons" {
			count++
		}
	}
	return count, nil
}
