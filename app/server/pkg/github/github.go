package github

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"time"

	log "github.com/sirupsen/logrus"
)

const (
	timeInterval = 5 * time.Minute
	repoName     = "litmus"
)

var basePath = os.Getenv("GOPATH") + "/src/github.com/litmuschaos/charthub.litmuschaos.io/app/client/public/githubData/"

// Handler is responsible for the looping the UpdateGithubData()
func Handler() {
	for {
		func() {
			defer func() {
				if r := recover(); r != nil {
					log.Errorf("Recovered from panic in github Handler: %v", r)
				}
			}()
			log.Infof("Updating Github Litmus Repo Data ...")
			err := UpdateGithubData()
			if err != nil {
				log.Error(err)
			}
		}()
		time.Sleep(timeInterval)
	}
}

//UpdateGithubData updates github data related to litmus repo, makes a get request to the public APIs
//of github to fetch repo
func UpdateGithubData() error {
	if _, err := os.Stat(basePath); os.IsNotExist(err) {
		os.Mkdir(basePath, 0700)
	}
	response, err := http.Get("https://api.github.com/repos/litmuschaos/" + repoName)
	if err != nil {
		return fmt.Errorf("Error while getting github repo data, err :%s", err)
	}
	defer response.Body.Close()
	if response.StatusCode != http.StatusOK {
		return fmt.Errorf("GitHub API returned non-OK status: %d", response.StatusCode)
	}
	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return fmt.Errorf("Error while reading response body, err :%s", err)
	}
	file, err := os.Create(basePath + "githubRepoData.json")
	if err != nil {
		return fmt.Errorf("Error saving github data, err :%s", err)
	}
	defer file.Close()
	_, err = file.WriteString(string(data))
	if err != nil {
		return fmt.Errorf("Error writing github data, err :%s", err)
	}
	return nil
}
