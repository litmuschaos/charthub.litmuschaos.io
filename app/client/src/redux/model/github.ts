export interface GithubData {
	star_count: number;
}

export enum GithubActions {
	LOAD_STAR_COUNT = "LOAD_STAR_COUNT",
}

interface GithubActionType<T, P> {
	type: T;
	payload: P;
}

export type GithubAction = GithubActionType<
	typeof GithubActions.LOAD_STAR_COUNT,
	number
>;
