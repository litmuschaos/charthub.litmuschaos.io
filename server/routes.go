package main

import "net/http"

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{
		"apiForFile",
		"GET",
		"/api/",
		fileHandler,
	},
	Route{
		"GetCharts",
		"GET",
		"/charts",
		GetCharts,
	},
	Route{
		"GetChart",
		"GET",
		"/charts/{chartId}",
		GetChart,
	},
}
