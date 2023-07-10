import { DockerPullAction, DockerPullData, DockerPullDataActions } from "../model/docker";
import createReducer from "./createReducer";

const initialState: DockerPullData = {
	pull_count: 0,
};

export const dockerPullData = createReducer<DockerPullData>(initialState, {
	[DockerPullDataActions.DOCKER_PULL_COUNT](
		state: DockerPullData,
		action: DockerPullAction
	) {
		return {
			...state,
			pull_count: action.payload,
		};
	},
});
