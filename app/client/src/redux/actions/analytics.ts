import { AnalyticsActions } from "../model";

const baseURL = "http://localhost:8080/";

export const loadAnalytics = () => (dispatch: Function, getState: Function) => {
	fetch(baseURL + "analytics")
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
