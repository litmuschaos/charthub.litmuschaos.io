import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		maxWidth: 600,
		display: "flex",
		flexDirection: "column",
		color: theme.palette.text.secondary,
		fontSize: 18,
		marginTop: 40,
		[theme.breakpoints.up("xl")]: {
			marginLeft: "3%",
		},
		[theme.breakpoints.down("sm")]: {
			marginTop: 12,
		},
	},
	expHeader: {
		fontWeight: "bold",
		fontSize: 24,
		marginBottom: 8,
		color: theme.palette.common.white,
		[theme.breakpoints.down("xs")]: {
			paddingTop: 10,
			fontSize: 18,
		},
	},
	expInfo: {
		marginTop: 10,
		marginLeft: 20,
		padding: "3px 10px 3px 10px",
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.common.white,
		borderRadius: 3,
		textAlign: "center",
	},
	expDesc: {
		marginBottom: 8,
		color: theme.palette.common.white,
	},
	expImg: {
		width: 100,
		height: 100,
		borderRadius: 10,
	},
	expDiv: {
		display: "flex",
		flexDirection: "row",
		[theme.breakpoints.down("sm")]: {
			display: "flex",
			flexDirection: "column",
		},
	},
	expDiv1: {
		display: "flex",
		flexDirection: "row",
	},
	titleDiv: {
		display: "flex",
		flexDirection: "column",
		marginLeft: 20,
		marginTop: 10,
		width: 350,
		[theme.breakpoints.down("sm")]: {
			marginTop: 0,
			marginLeft: 0,
		},
		[theme.breakpoints.down("xs")]: {
			width: "70%",
			marginTop: 0,
			marginLeft: 0,
		},
	},
}));
