export interface AnalyticsData {
	expAnalytics: Map<string, number>;
	chaosOperatorCount: number;
	totalExpRuns: number;
}
export enum AnalyticsActions {
	LOAD_ANALYTICS = "LOAD_ANALYTICS",
}

interface AnalyticsActionType<T, P> {
	type: T;
	payload: P;
}

export type AnalyticsAction = AnalyticsActionType<
	typeof AnalyticsActions.LOAD_ANALYTICS,
	Map<string, number>
>;
