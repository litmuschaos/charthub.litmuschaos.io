import { AnalyticsAction } from "./analytics";
import { ChartAction } from "./charts";
import { GithubAction } from "./github";
import { ThemeAction } from "./theme";
import { VersionAction } from "./versions";

export * from "./analytics";
export * from "./charts";
export * from "./github";
export * from "./theme";
export * from "./versions";

export type Action =
	| ThemeAction
	| ChartAction
	| AnalyticsAction
	| VersionAction
	| GithubAction;
