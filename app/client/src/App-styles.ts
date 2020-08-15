import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "100%",
		zIndex: 1,
		overflow: "auto",
		"&::-webkit-scrollbar": {
			width: "0.5em",
		},
		"&::-webkit-scrollbar-track": {
			webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
			borderRadius: "0.5em",
		},
		"&::-webkit-scrollbar-thumb": {
			backgroundColor: theme.palette.text.primary,
			outline: "1px solid slategrey",
			borderRadius: "0.5em",
		},
	},
	appFrame: {
		position: "relative",
		display: "flex",
		width: "100%",
		height: "100%",
		color: theme.palette.primary.contrastText,
	},
	content: {
		backgroundColor: theme.palette.background.default,
		width: "100%",
	},
	routeBody: {
		width: "100%",
	},
}));
