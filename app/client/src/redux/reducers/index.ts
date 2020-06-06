import { History } from "history";
import { combineReducers } from "redux";
import { Todo, Theme, GithubData, AnalyticsData } from "../model";
import * as todoReducer from "./todo";
import * as themeReducer from "./theme";
import * as githubReducer from "./github";
import * as analyticsReducer from "./analytics";

export interface RootState {
	todoList: Todo[];
	theme: Theme;
	githubData: GithubData;
	analyticsData: AnalyticsData;
}

export default (history: History) =>
	combineReducers({
		...todoReducer,
		...themeReducer,
		...githubReducer,
		...analyticsReducer,
	});
