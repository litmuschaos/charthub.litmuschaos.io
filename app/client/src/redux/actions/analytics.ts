import { AnalyticsActions } from "../model";
import * as VersionActions from "./versions";

let baseURL: string = "";
if (
	process.env.NODE_ENV.trim() === "development" ||
	process.env.NODE_ENV.trim() === "test"
) {
	baseURL = `${window.location.protocol}//${window.location.hostname}:8080`;
} else baseURL = "/api";

function convertToMap(data: any) {
	let mapped_data = new Map<string, number>();
	data.forEach((d: { Label: string; Count: number }) => {
		mapped_data.set(d.Label, Number(d.Count));
	});
	return mapped_data;
}

export const loadAnalytics = () => (dispatch: Function, getState: Function) => {
	fetch(baseURL + "/analytics")
		.then((response) => response.json())
		.then((data) => {
			let mapped_data = convertToMap(data);
			dispatch({
				type: AnalyticsActions.LOAD_ANALYTICS,
				payload: mapped_data,
			});
			dispatch(VersionActions.loadVersions());
		})
		.catch((err) => {
			console.error("Can't load data", err);
			dispatch({
				type: AnalyticsActions.LOAD_ANALYTICS,
				payload: new Map<string, number>(),
			});
		});
};
