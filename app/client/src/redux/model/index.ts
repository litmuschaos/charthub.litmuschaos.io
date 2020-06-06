import { AnalyticsAction } from "./analytics";
import { ChartAction } from "./charts";
import { GithubAction } from "./github";
import { ThemeAction } from "./theme";
import { TodoAction } from "./todo";
import { VersionAction } from "./versions";

export * from "./theme";
export * from "./todo";

export type Action =
	| TodoAction
	| ThemeAction
	| ChartAction
	| AnalyticsAction
	| VersionAction
	| GithubAction;
