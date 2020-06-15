export interface GithubContributor {
	githubName: string;
	githubProfileUrl: string;
	contributions: number;
}

export interface GithubData {
	contributorList: GithubContributor[];
	star_count: number;
}

export enum GithubActions {
	LOAD_CONTRIBUTORS = "LOAD_CONTRIBUTORS",
	LOAD_STAR_COUNT = "LOAD_STAR_COUNT",
}

interface GithubActionType<T, P> {
	type: T;
	payload: P;
}

export type GithubAction =
	| GithubActionType<
			typeof GithubActions.LOAD_CONTRIBUTORS,
			GithubContributor[]
	  >
	| GithubActionType<typeof GithubActions.LOAD_STAR_COUNT, number>;
