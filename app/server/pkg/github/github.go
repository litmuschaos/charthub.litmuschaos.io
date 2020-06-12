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
	for true {
		log.Infof("Updating Github Litmus Repo Data ...")
		err := UpdateGithubData()
		if err != nil {
			log.Error(err)
		}
		time.Sleep(timeInterval)
	}
}

//UpdateGithubData updates github data related to litmus repo, makes a get request to the public APIs
//of github to fetch repo and contributor data
func UpdateGithubData() error {
	if _, err := os.Stat(basePath); os.IsNotExist(err) {
		os.Mkdir(basePath, 0700)
	}
	response, err := http.Get("https://api.github.com/repos/litmuschaos/" + repoName)
	if err != nil {
		return fmt.Errorf("Error while getting github repo data, err :%s", err)
	}
	data, _ := ioutil.ReadAll(response.Body)
	file, err := os.Create(basePath + "githubRepoData.json")
	if err != nil {
		return fmt.Errorf("Error saving github data, err :%s", err)
	}
	file.WriteString(string(data))
	defer file.Close()

	response, err = http.Get("https://api.github.com/repos/litmuschaos/" + repoName + "/contributors")
	if err != nil {
		return fmt.Errorf("Error while getting github contributor data, err :%s", err)
	}
	data, _ = ioutil.ReadAll(response.Body)
	file, err = os.Create(basePath + "githubContributorData.json")
	if err != nil {
		return fmt.Errorf("Error saving github contributor data, err :%s", err)
	}
	file.WriteString(string(data))
	defer file.Close()
	return nil
}
