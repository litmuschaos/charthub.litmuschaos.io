import { AnalyticsActions } from "../model";

let baseURL: string = "";
if (
	process.env.NODE_ENV.trim() === "development" ||
	process.env.NODE_ENV.trim() === "test"
) {
	baseURL = `${window.location.protocol}//${window.location.hostname}:8080`;
} else baseURL = "/api";

export const loadAnalytics = () => (dispatch: Function, getState: Function) => {
	fetch(baseURL + "/analytics")
		.then((response) => response.json())
		.then((data) => {
			let mapped_data = new Map<string, number>();
			data.forEach((d: { Label: string; Count: number }) => {
				mapped_data.set(d.Label, d.Count);
			});
			dispatch({
				type: AnalyticsActions.LOAD_ANALYTICS,
				payload: mapped_data,
			});
		});
};
