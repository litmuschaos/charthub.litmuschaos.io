import { makeStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 120;
export const useStyles = makeStyles((theme: Theme) => ({
	drawerHeader: { ...theme.mixins.toolbar },
	drawerPaper: {
		width: drawerWidth,
		color: theme.palette.primary.contrastText,
		backgroundColor: theme.palette.background.paper,
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			position: "relative",
			height: "100%",
		},
	},
	formControl: {
		marginTop: theme.spacing(3),
		marginLeft: "auto",
		marginRight: "auto",
		display: "block",
		width: "fit-content",
		fontWeight: 700,
	},
	button: {
		color: theme.palette.primary.contrastText,
		margin: "0 auto",
		[theme.breakpoints.down("sm")]: {
			fontSize: 25,
		},
		[theme.breakpoints.up("md")]: {
			fontSize: 30,
		},
		[theme.breakpoints.up("lg")]: {
			fontSize: 35,
		},
	},
	drawerList: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		margin: "auto",
		width: "80%",
		height: "100%",
		fontWeight: 700,
	},
	drawerListItem: {
		display: "flex",
		flexDirection: "column",
		margin: "auto",
		borderRadius: 10,
		"&:hover": {
			backgroundColor: theme.palette.primary.dark,
		},
	},
	logo: {
		display: "block",
		marginTop: theme.spacing(4),
		marginLeft: "auto",
		marginRight: "auto",
		width: "85%",
	},
}));
