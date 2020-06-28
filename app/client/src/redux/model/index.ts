import { AnalyticsAction } from "./analytics";
import { ChartAction } from "./charts";
import { GithubAction } from "./github";
import { VersionAction } from "./versions";

export * from "./analytics";
export * from "./charts";
export * from "./github";
export * from "./versions";

export type Action =
	| ChartAction
	| AnalyticsAction
	| VersionAction
	| GithubAction;
