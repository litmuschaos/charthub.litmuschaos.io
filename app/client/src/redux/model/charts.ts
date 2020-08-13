export interface Maintainer {
	name: string;
	email: string;
}
export interface Link {
	name: string;
	url: string;
}
export interface Experiment {
	name: string;
	metadataName: string;
	version: string;
	vendor?: string;
	category?: string;
	createdAt?: string;
	supportLink?: string;
	expGroup?: string;
	totalRuns?: number;
	description: string;
	maturity: string;
	maintainers: Maintainer[];
	miniKubeVersion?: string;
	provider: string;
	links: Link[];
	chaosExpCRDLink: string;
	platforms: string[];
	chaosType?: string;
}
export interface ExperimentGroup {
	name: string;
	metadataName: string;
	version: string;
	vendor?: string;
	createdAt?: string;
	supportLink?: string;
	description: string;
	categoryDescription: string;
	maintainers: Maintainer[];
	miniKubeVersion?: string;
	provider: string;
	links: Link[];
	experiments: Experiment[];
	chaosExpCRDLink: string;
}

export interface ChartData {
	allExperimentGroups: ExperimentGroup[];
	allExperiments: Experiment[];
	totalExpCount: number;
}

export enum ChartActions {
	LOAD_ALL_CHARTS = "LOAD_ALL_CHARTS",
}

interface ChartActionType<T, P> {
	type: T;
	payload: P;
	chartAnalytics: Map<string, number>;
}

export type ChartAction = ChartActionType<
	typeof ChartActions.LOAD_ALL_CHARTS,
	ExperimentGroup[]
>;
