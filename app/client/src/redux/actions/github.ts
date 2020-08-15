import { GithubActions } from "../model";
let baseURL: string = "";
if (
	process.env.NODE_ENV.trim() === "development" ||
	process.env.NODE_ENV.trim() === "test"
) {
	baseURL = `${window.location.protocol}//${window.location.hostname}:8080`;
} else baseURL = "/api";

export const loadStarCount = () => (dispatch: Function, getState: Function) => {
	fetch(`${baseURL}/github/repo`)
		.then((response) => response.json())
		.then((data) => {
			dispatch({
				type: GithubActions.LOAD_STAR_COUNT,
				payload: data["stargazers_count"],
			});
		})
		.catch((err) => {
			console.error("Can't load data", err);
			dispatch({
				type: GithubActions.LOAD_STAR_COUNT,
				payload: 0,
			});
		});
};
