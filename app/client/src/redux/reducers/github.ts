import { GithubActions, GithubData, GithubAction } from "../model";
import createReducer from "./createReducer";

const initialState: GithubData = {
	contributorList: [
		{ githubName: "", githubProfileUrl: "", contributions: 0 },
	],
	star_count: 0,
};

export const githubData = createReducer<GithubData>(initialState, {
	[GithubActions.LOAD_STAR_COUNT](state: GithubData, action: GithubAction) {
		return { ...state, star_count: action.payload };
	},
	[GithubActions.LOAD_CONTRIBUTORS](state: GithubData, action: GithubAction) {
		return { ...state, contributorList: action.payload };
	},
});
