import { GithubActions, GithubData, GithubAction } from "../model";
import createReducer from "./createReducer";

const initialState: GithubData = {
	star_count: 0,
};

export const githubData = createReducer<GithubData>(initialState, {
	[GithubActions.LOAD_STAR_COUNT](state: GithubData, action: GithubAction) {
		return { ...state, star_count: action.payload };
	},
});
