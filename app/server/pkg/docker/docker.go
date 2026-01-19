package docker

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func FetchDockerPullsDetails() ([]byte, error) {
	response, err := http.Get("https://hub.docker.com/v2/repositories/litmuschaos/chaos-operator/")
	if err != nil {
		return nil, fmt.Errorf("Error while getting docker pull data, err :%s", err)
	}
	defer response.Body.Close()
	if response.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("Docker Hub API returned non-OK status: %d", response.StatusCode)
	}
	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("Error while reading docker pull data, err :%s", err)
	}
	return data, nil
}
