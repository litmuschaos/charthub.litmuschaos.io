import { makeStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 240;
export const useStyles = makeStyles((theme: Theme) => ({
	drawerHeader: { ...theme.mixins.toolbar },
	drawerPaper: {
		width: 250,
		color: theme.palette.primary.contrastText,
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			position: "relative",
			height: "100%",
		},
	},
	button: {
		color: theme.palette.text.primary,
	},
}));
