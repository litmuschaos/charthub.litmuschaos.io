import { makeStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 100;
export const useStyles = makeStyles((theme: Theme) => ({
	drawerHeader: { ...theme.mixins.toolbar },
	drawerPaper: {
		width: drawerWidth,
		color: theme.palette.primary.contrastText,
		backgroundColor: theme.palette.background.default,
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			position: "relative",
			height: "100%",
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 80,
	},
	button: {
		color: theme.palette.text.primary,
	},
}));
