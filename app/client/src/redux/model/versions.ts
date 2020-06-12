export interface VersionData {
	versions: string[];
	currentVersion: string;
}

export enum VersionActions {
	LOAD_VERSIONS = "LOAD_VERSIONS",
	TOGGLE_VERSION = "TOGGLE_VERSION",
}

interface VersionActionType<T, P> {
	type: T;
	payload: P;
}

export type VersionAction =
	| VersionActionType<typeof VersionActions.LOAD_VERSIONS, string[]>
	| VersionActionType<typeof VersionActions.TOGGLE_VERSION, string>;
