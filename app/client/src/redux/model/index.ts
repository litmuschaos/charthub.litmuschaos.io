import { AnalyticsAction } from "./analytics";
import { ChartAction } from "./charts";
import { GithubAction } from "./github";
import { ThemeAction } from "./theme";
import { TodoAction } from "./todo";
import { VersionAction } from "./versions";

export * from "./theme";
export * from "./todo";
export * from "./github";
export * from "./analytics";
export * from "./versions";
export * from "./charts";

export type Action =
	| TodoAction
	| ThemeAction
	| ChartAction
	| AnalyticsAction
	| VersionAction
	| GithubAction;
