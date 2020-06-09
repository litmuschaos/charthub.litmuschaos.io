import { History } from "history";
import { combineReducers } from "redux";
import {
	AnalyticsData,
	ChartData,
	GithubData,
	Theme,
	VersionData,
} from "../model";
import * as analyticsReducer from "./analytics";
import * as chartReducer from "./charts";
import * as githubReducer from "./github";
import * as themeReducer from "./theme";
import * as versionsReducer from "./versions";

export interface RootState {
	theme: Theme;
	githubData: GithubData;
	analyticsData: AnalyticsData;
	versionData: VersionData;
	chartData: ChartData;
}

export default (history: History) =>
	combineReducers({
		...themeReducer,
		...githubReducer,
		...analyticsReducer,
		...versionsReducer,
		...chartReducer,
	});
