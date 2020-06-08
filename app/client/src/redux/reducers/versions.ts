import { VersionActions, VersionAction, VersionData } from "../model";
import createReducer from "./createReducer";

const initialState: VersionData = {
	versions: [],
	currentVersion: "",
};

export const versionData = createReducer<VersionData>(initialState, {
	[VersionActions.LOAD_VERSIONS](state: VersionData, action: VersionAction) {
		return {
			...state,
			versions: action.payload,
			currentVersion: action.payload[0],
		};
	},
	[VersionActions.TOGGLE_VERSION](state: VersionData, action: VersionAction) {
		const match = state.versions.filter((i: string) => i == action.payload);
		if (match !== [])
			return {
				...state,
				currentVersion: action.payload,
			};
		else return state;
	},
});
