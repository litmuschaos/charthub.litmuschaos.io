import { DockerPullDataActions } from "../model";
let baseURL: string = "";
if (
	process.env.NODE_ENV.trim() === "development" ||
	process.env.NODE_ENV.trim() === "test"
) {
	baseURL = `${window.location.protocol}//${window.location.hostname}:8080`;
} else baseURL = "/api";

export const loadDockerPullCount =
	() => (dispatch: Function, getState: Function) => {
		fetch(`${baseURL}/docker-pulls`)
			.then((response) => response.json())
			.then((data) => {
				dispatch({
					type: DockerPullDataActions.DOCKER_PULL_COUNT,
					payload: data["pull_count"],
				});
			})
			.catch((err) => {
				console.error("Can't load data", err);
				dispatch({
					type: DockerPullDataActions.DOCKER_PULL_COUNT,
					payload: 12000000, //setting default value to 12M
				});
			});
	};
