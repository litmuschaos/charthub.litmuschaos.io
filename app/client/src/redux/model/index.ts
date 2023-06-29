import { AnalyticsAction } from "./analytics";
import { ChartAction } from "./charts";
import { DockerPullAction } from "./docker";
import { GithubAction } from "./github";
import { VersionAction } from "./versions";

export * from "./analytics";
export * from "./charts";
export * from "./github";
export * from "./versions";
export * from "./docker";

export type Action =
	| ChartAction
	| AnalyticsAction
	| VersionAction
	| GithubAction
	| DockerPullAction
