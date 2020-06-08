import { ChartActions } from "../model";

let baseURL: string = "";
if (
	process.env.NODE_ENV.trim() === "development" ||
	process.env.NODE_ENV.trim() === "test"
) {
	baseURL = `${window.location.protocol}//${window.location.hostname}:8080`;
} else baseURL = "/api";

export const loadAllCharts = (version: string) => (
	dispatch: Function,
	getState: Function
) => {
	fetch(baseURL + `/charts/${version}`)
		.then((response) => response.json())
		.then((data) => {
			dispatch({
				type: ChartActions.LOAD_ALL_CHARTS,
				payload: data,
			});
		})
		.catch((err) => {
			console.error("Can't load data", err);
			dispatch({
				type: ChartActions.LOAD_ALL_CHARTS,
				payload: [],
			});
		});
};
