import { makeStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 120;
export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "100vh",
		display: "flex",
		flexDirection: "row",
		overflow: "hidden",
	},
	route: {
		width: "100%",
		overflowY: "scroll",
	},
	drawerHeader: { ...theme.mixins.toolbar },
	drawerPaper: {
		width: drawerWidth,
		height: "100vh",
		color: theme.palette.primary.contrastText,
		backgroundColor: theme.palette.background.paper,
		overflow: "hidden",
		[theme.breakpoints.up("md")]: {
			width: drawerWidth,
			position: "relative",
			height: "100vh",
		},
	},
	label: {
		"&$focused": {
			color: theme.palette.text.primary,
		},
	},
	focused: {},
	formControl: {
		marginTop: theme.spacing(3),
		margin: "0 auto",
		display: "block",
		width: "80%",
		fontWeight: 700,
		"& > *": {
			width: "100%",
		},
	},
	button: {
		color: theme.palette.primary.contrastText,
		margin: "0 auto",
		fontSize: 35,
		[theme.breakpoints.up("md")]: {
			fontSize: 40,
		},
	},
	drawerList: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		margin: "0px auto",
		marginBottom: 180,
		width: "80%",
		height: "100%",
		fontWeight: 700,
	},
	drawerListItem: {
		display: "flex",
		flexDirection: "column",
		margin: "8px auto",
		borderRadius: 10,
		"&:hover": {
			backgroundColor: theme.palette.primary.dark,
		},
		[theme.breakpoints.up("md")]: {
			margin: "24px auto",
		},
		[theme.breakpoints.up("lg")]: {
			margin: "24px auto",
		},
	},
	listLabel: {
		fontSize: 16,
		fontWeight: 500,
		color: theme.palette.text.primary,
	},
	logo: {
		display: "block",
		marginTop: theme.spacing(4),
		marginLeft: "auto",
		marginRight: "auto",
		width: "85%",
		cursor: "pointer",
	},
}));
