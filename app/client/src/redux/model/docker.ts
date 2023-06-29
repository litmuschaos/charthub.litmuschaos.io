

export interface DockerPullData {
	pull_count: number;
}

export enum DockerPullDataActions {
	DOCKER_PULL_COUNT = "DOCKER_PULL_COUNT",
}

interface DockerPullType<T, P> {
	type: T;
	payload: P;
}

export type DockerPullAction = DockerPullType<
	typeof DockerPullDataActions.DOCKER_PULL_COUNT,
	number
>;
