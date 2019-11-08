package routes

import (
	"net/http"

	"github.com/litmuschaos/charthub.litmuschaos.io/server/controller/handler"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{
		"FileHandler",
		"GET",
		"/chaos",
		handler.FileHandler,
	},
	Route{
		"GetCharts",
		"GET",
		"/charts",
		handler.GetCharts,
	},
	Route{
		"GetChart",
		"GET",
		"/charts/{chartId}",
		handler.GetChart,
	},
}
