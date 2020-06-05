export interface GithubContributor {
	githubName: string;
	githubProfileUrl: string;
	contributions: number;
}

export enum GithubContributorActions {
	LOAD_CONTRIBUTORS = "LOAD_CONTRIBUTORS",
	LOAD_STAR_COUNT = "LOAD_STAR_COUNT",
}

interface GithubContributorActionType<T, P> {
	type: T;
	payload: P;
}

export type GithubContributorAction =
	| GithubContributorActionType<
			typeof GithubContributorActions.LOAD_CONTRIBUTORS,
			GithubContributor[]
	  >
	| GithubContributorActionType<
			typeof GithubContributorActions.LOAD_STAR_COUNT,
			GithubContributor[]
	  >;
