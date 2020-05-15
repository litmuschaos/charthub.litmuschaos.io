/*
Copyright 2019 LitmusChaos Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

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
		"/chaos/{version}",
		handler.FileHandler,
	},
	Route{
		"GetCharts",
		"GET",
		"/charts/{version}",
		handler.GetCharts,
	},
	Route{
		"GetChart",
		"GET",
		"/charts/{version}/{chartId}",
		handler.GetChart,
	},
	Route{
		"GetAnalyticsData",
		"GET",
		"/analytics",
		handler.GetAnalyticsData,
	},
	Route{
		"Version",
		"GET",
		"/version",
		handler.GetChartVersion,
	},
	Route{
		"Webhook",
		"POST",
		"/webhook",
		handler.Webhook,
	},
}
