import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "100%",
		zIndex: 1,
		overflow: "hidden",
		color: theme.palette.primary.contrastText,
	},
	appFrame: {
		position: "relative",
		display: "flex",
		width: "100%",
		height: "100%",
		overflow: "hidden",
	},
	content: {
		backgroundColor: theme.palette.background.default,
		width: "100%",
	},
	routeBody: {
		width: "100%",
		overflowY: "scroll",
	},
}));
