import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "100%",
		zIndex: 1,
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
		[theme.breakpoints.down("md")]: {
			marginTop: theme.spacing(4),
		},
	},
	routeBody: {
		width: "100%",
	},
}));
