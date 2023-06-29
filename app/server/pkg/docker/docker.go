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
	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("Error while getting docker pull data, err :%s", err)
	}
	return data, err
}
