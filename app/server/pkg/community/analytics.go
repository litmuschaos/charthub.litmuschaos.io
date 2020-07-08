package community

import (
	"encoding/json"

	"github.com/litmuschaos/charthub.litmuschaos.io/app/server/pkg/community/github"
	"github.com/litmuschaos/charthub.litmuschaos.io/app/server/pkg/community/google"
)

type AnalyticsData struct {
	Github github.GithubData          `json:"github"`
	Google google.CommunityGAResponse `json:"google"`
}

func StartHandlers() {
	go github.Handler()
	go google.Handler()
}

func GetAnalytics() ([]byte, error) {
	var analytics AnalyticsData
	analytics.Github = github.Github
	analytics.Google = google.GAResponseJSONObject
	return json.Marshal(analytics)
}
