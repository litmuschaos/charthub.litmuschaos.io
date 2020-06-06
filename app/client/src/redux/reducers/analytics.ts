import { AnalyticsActions, AnalyticsAction, AnalyticsData } from "../model";
import createReducer from "./createReducer";

const initialState: AnalyticsData = {
	expAnalytics: new Map<string, number>(),
	chaosOperatorCount: 0,
	totalExpRuns: 0,
};

export const analyticsData = createReducer<AnalyticsData>(initialState, {
	[AnalyticsActions.LOAD_ANALYTICS](
		state: AnalyticsData,
		action: AnalyticsAction
	) {
		const chaosOperatorCount = action.payload.get("Chaos-Operator");
		const totalExpRuns = action.payload.get("Total-Count");
		return {
			expAnalytics: action.payload,
			chaosOperatorCount,
			totalExpRuns,
		};
	},
});
