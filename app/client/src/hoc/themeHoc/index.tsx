import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import * as React from "react";

// Agument the Theme interface
declare module "@material-ui/core/styles/createMuiTheme" {
	interface Theme {
		// newProperty: {
		// 	key: value;
		// }
	}
	// allow configuration using `createMuiTheme`
	interface ThemeOptions {
		// newProperty?: {
		// 	key?: value;
		// }
	}
}

// Augument the Palette interface
declare module "@material-ui/core/styles/createPalette" {
	interface Palette {
		// newProperty: {
		// 	key: value;
		// }
	}
	// allow configuration using `createMuiTheme`
	interface PaletteOptions {
		// newProperty?: {
		// 	key?: value;
		// }
	}
}
function customTheme(options: ThemeOptions) {
	return createMuiTheme({
		palette: {
			primary: {
				light: "rgba(225, 226, 238, 0.88)",
				main: "rgba(225, 226, 238)",
				dark: "rgb(204, 208, 239)",
				contrastText: "rgba(20, 47, 72, 0.95)",
			},
			secondary: {
				light: "#858CDD",
				main: "rgb(54, 220, 200)",
				dark: "rgba(20, 47, 72, 0.88)",
				contrastText: "rgb(10, 55, 171)",
			},
			error: {
				light: "rgba(255, 0, 0, 0.1)",
				main: "#BA3B34",
				dark: "#CA2C2C",
			},
			background: {
				paper: "rgba(225, 226, 238)",
				default: "rgb(255, 255, 255)",
			},
			text: {
				primary: "#5B44BA",
				secondary: "#042A2B",
				disabled: "rgba(4, 42, 43, 0.6)",
				hint: "rgba(20, 47, 72, 0.54)",
			},
		},
		typography: {
			fontSize: 12,
			fontFamily: "Ubuntu",
		},
		...options,
	});
}

const theme = customTheme({
	overrides: {
		MuiTooltip: {
			tooltip: {
				backgroundColor: "rgba(0,0,0,0.8)",
				color: "#FFFFFF",
				width: 200,
				fontSize: 12,
				borderRadius: 2,
			},
		},
	},
});

export default function withTheme(Component: any) {
	function WithTheme(props: object) {
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...props} />
			</ThemeProvider>
		);
	}

	return WithTheme;
}
