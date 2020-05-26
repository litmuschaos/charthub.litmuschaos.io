import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducers";

// Agument the Theme interface
declare module "@material-ui/core/styles/createMuiTheme" {
	interface Theme {
		appDrawer: {
			width: React.CSSProperties["width"];
			breakpoint: Breakpoint;
		};
	}
	// allow configuration using `createMuiTheme`
	interface ThemeOptions {
		appDrawer?: {
			width?: React.CSSProperties["width"];
			breakpoint?: Breakpoint;
		};
	}
}

// Augument the Palette interface
declare module "@material-ui/core/styles/createPalette" {
	interface Palette {
		tertiary: {
			main: string;
		};
	}
	// allow configuration using `createMuiTheme`
	interface PaletteOptions {
		tertiary?: {
			main?: string;
		};
	}
}
function customTheme(options: ThemeOptions) {
	return createMuiTheme({
		appDrawer: {
			width: 225,
			breakpoint: "lg",
		},
		palette: {
			primary: {
				light: "#fff",
				main: "#fafafa",
				dark: "#363839",
				contrastText: "#000",
			},
			secondary: {
				light: "#ff5e50",
				main: "#e41e26",
				dark: "#a90000",
				contrastText: "#fff",
			},
			background: {
				paper: "#fafafa",
				default: "#fafafa",
			},
			text: {
				primary: "#000",
			},
			tertiary: {
				main: "#ffd900",
			},
		},
		...options,
	});
}

const lightTheme = customTheme({});

const darktheme = customTheme({
	palette: {
		primary: {
			light: "#323232",
			main: "#2C2C2C",
			dark: "#121212",
			contrastText: "#fff",
		},
		background: {
			paper: "#323232",
			default: "#222222",
		},
		text: {
			primary: "#fff",
		},
		tertiary: {
			main: "#0080ff",
		},
	},
});

export function withTheme(Component: any) {
	function WithTheme(props: object) {
		// MuiThemeProvider makes the theme available down the React tree
		// thanks to React context.
		const isDarkTheme = useSelector(
			(state: RootState) => state.theme.isDarkTheme
		);
		return (
			<ThemeProvider theme={!isDarkTheme ? lightTheme : darktheme}>
				{/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Component {...props} />
			</ThemeProvider>
		);
	}

	return WithTheme;
}
