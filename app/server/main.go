package main

import (
	"log"
	"net/http"

	"github.com/litmuschaos/charthub.litmuschaos.io/app/server/pkg/analytics"
	"github.com/litmuschaos/charthub.litmuschaos.io/app/server/pkg/community"
	"github.com/litmuschaos/charthub.litmuschaos.io/app/server/pkg/github"
	"github.com/litmuschaos/charthub.litmuschaos.io/app/server/pkg/gitops"
	"github.com/litmuschaos/charthub.litmuschaos.io/app/server/routes"
)

func main() {
	// Handler is go-routine which synchronously calls the git-ops function UpdateAnalyticsData()
	go analytics.Handler()
	// Trigger is go-routine which synchronously calls the git-ops function Trigger()
	go gitops.Trigger()
	// Handler is go-routine which synchronously calls the github function UpdateGithubData()
	go github.Handler()
	// Starts all handlers for community analytics
	community.StartHandlers()
	router := routes.NewRouter()
	log.Fatal(http.ListenAndServe(":8080", router))
}
