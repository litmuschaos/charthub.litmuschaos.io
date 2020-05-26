import { History } from "history";
import { combineReducers } from "redux";
import { Todo, Theme } from "../model";
import * as todoReducer from "./todo";
import * as themeReducer from "./theme";

export interface RootState {
	todoList: Todo[];
	theme: Theme;
}

export default (history: History) =>
	combineReducers({
		...todoReducer,
		...themeReducer,
	});
