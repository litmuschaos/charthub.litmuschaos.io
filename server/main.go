package main

import (
	"log"
	"net/http"
)

func listenerFunc() {

	router := NewRouter()
	log.Fatal(http.ListenAndServe(":8080", router))

}

func gitFunc() {

}

func main() {

	listenerFunc()

}
