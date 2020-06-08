import { VersionActions } from "../model";
import * as ChartActions from "./charts";

let baseURL: string = "";
if (
	process.env.NODE_ENV.trim() === "development" ||
	process.env.NODE_ENV.trim() === "test"
) {
	baseURL = `${window.location.protocol}//${window.location.hostname}:8080`;
} else baseURL = "/api";

export const loadVersions = () => (dispatch: Function, getState: Function) => {
	fetch(baseURL + "/version")
		.then((response) => response.json())
		.then((data) => {
			dispatch(ChartActions.loadAllCharts(data[0]));
			dispatch({
				type: VersionActions.LOAD_VERSIONS,
				payload: data,
			});
		})
		.catch((err) => {
			console.error("Can't load data", err);
			dispatch({
				type: VersionActions.LOAD_VERSIONS,
				payload: ["1.4.1"],
			});
		});
};

export const toggleVersion = (version: string) => (
	dispatch: Function,
	getState: Function
) => {
	dispatch(ChartActions.loadAllCharts(version));
	dispatch({
		type: VersionActions.TOGGLE_VERSION,
		payload: version,
	});
};
