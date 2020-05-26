import { TodoAction } from "./todo";
import { ThemeAction } from "./theme";

export * from "./todo";
export * from "./theme";

export type Action = TodoAction | ThemeAction;
