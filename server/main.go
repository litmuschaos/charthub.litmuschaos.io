package main

import (
	"log"
	"net/http"

	"github.com/litmuschaos/charthub.litmuschaos.io/server/pkg/analytics"
	"github.com/litmuschaos/charthub.litmuschaos.io/server/pkg/gitops"
	"github.com/litmuschaos/charthub.litmuschaos.io/server/routes"
)

func main() {
	
	// Driver is go-routine which synchronously calls the git-ops function Driver()
	go analytics.Driver()
	// Trigger is go-routine which synchronously calls the git-ops function Trigger()
	go gitops.Trigger()
	router := routes.NewRouter()
	log.Fatal(http.ListenAndServe(":8080", router))
}
