import { ThemeAction, ThemeActions, Theme } from "../model";
import createReducer from "./createReducer";

const initialState: Theme = {
	isDarkTheme: false,
};

export const theme = createReducer<Theme>(initialState, {
	[ThemeActions.TOGGLE_THEME](state: Theme, action: ThemeAction) {
		return { ...state, isDarkTheme: !state.isDarkTheme };
	},
});
