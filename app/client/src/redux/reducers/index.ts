import { History } from "history";
import { combineReducers } from "redux";
import {
	Todo,
	Theme,
	GithubData,
	AnalyticsData,
	VersionData,
	ChartData,
} from "../model";
import * as todoReducer from "./todo";
import * as themeReducer from "./theme";
import * as githubReducer from "./github";
import * as analyticsReducer from "./analytics";
import * as versionsReducer from "./versions";
import * as chartReducer from "./charts";

export interface RootState {
	todoList: Todo[];
	theme: Theme;
	githubData: GithubData;
	analyticsData: AnalyticsData;
	versionData: VersionData;
	chartData: ChartData;
}

export default (history: History) =>
	combineReducers({
		...todoReducer,
		...themeReducer,
		...githubReducer,
		...analyticsReducer,
		...versionsReducer,
		...chartReducer,
	});
