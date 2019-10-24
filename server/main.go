package main

import (
	"log"
	"net/http"
)

func main() {

	// Trigger is go-routine which synchronously calls the git-ops function Trigger()
	go Trigger()
	router := NewRouter()
	log.Fatal(http.ListenAndServe(":8080", router))
}
