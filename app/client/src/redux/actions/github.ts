import { GithubActions, GithubContributor } from "../model";
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
			console.log(data);
			dispatch({
				type: GithubActions.LOAD_STAR_COUNT,
				payload: data["stargazers_count"],
			});
		})
		.catch((err) => {
			console.log(err);
			dispatch({
				type: GithubActions.LOAD_STAR_COUNT,
				payload: 0,
			});
		});
};

export const loadContributors = () => (
	dispatch: Function,
	getState: Function
) => {
	fetch(`${baseURL}/github/contributors`)
		.then((response) => response.json())
		.then((data) => {
			data = data.map((d: any) => ({
				githubName: d["login"],
				githubProfileUrl: "https://github.com/" + d["login"],
				contributions: d["contributions"],
			}));
			data.sort(
				(a: GithubContributor, b: GithubContributor) =>
					a.contributions > b.contributions
			);
			dispatch({
				type: GithubActions.LOAD_CONTRIBUTORS,
				payload: data,
			});
		})
		.catch((err) => {
			console.log(err);
			dispatch({
				type: GithubActions.LOAD_CONTRIBUTORS,
				payload: [],
			});
		});
};
