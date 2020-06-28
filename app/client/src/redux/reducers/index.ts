import { History } from "history";
import { combineReducers } from "redux";
import { AnalyticsData, ChartData, GithubData, VersionData } from "../model";
import * as analyticsReducer from "./analytics";
import * as chartReducer from "./charts";
import * as githubReducer from "./github";
import * as versionsReducer from "./versions";

export interface RootState {
	githubData: GithubData;
	analyticsData: AnalyticsData;
	versionData: VersionData;
	chartData: ChartData;
}

export default (history: History) =>
	combineReducers({
		...githubReducer,
		...analyticsReducer,
		...versionsReducer,
		...chartReducer,
	});
