import { ThemeAction, ThemeActions } from "../model";

export function toggleTheme(): ThemeAction {
	return {
		type: ThemeActions.TOGGLE_THEME,
	};
}
