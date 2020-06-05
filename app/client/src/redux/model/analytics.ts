export interface Analytics {
	label: string;
	count: number;
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
	Analytics[]
>;
