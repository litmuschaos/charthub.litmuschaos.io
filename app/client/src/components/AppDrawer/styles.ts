import { makeStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 100;
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
		margin: theme.spacing(1),
		minWidth: 80,
	},
	button: {
		color: theme.palette.primary.contrastText,
		margin: "0 auto",
		[theme.breakpoints.down("sm")]: {
			fontSize: "30px",
		},
		[theme.breakpoints.up("md")]: {
			fontSize: "30px",
		},
		[theme.breakpoints.up("lg")]: {
			fontSize: "50px",
		},
	},
	drawerList: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		margin: "auto",
		width: "80%",
		height: "100%",
	},
	drawerListItem: {
		display: "flex",
		flexDirection: "column",
		margin: "auto",
		borderRadius: "10px",
		"&:hover": {
			background: "#CCD0EF",
		},
	},
}));
