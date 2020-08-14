import { Button, Theme, withStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Component styles
export const useStyles = makeStyles((theme) => ({
	rootContainer: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	root: {
		height: "100%",
		padding: theme.spacing(2),
	},
	imgFix: {
		width: "60%",
		marginLeft: "12%",
	},
	errorMsg: {
		fontFamily: "Ubuntu",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: "2.25em",
		lineHeight: "110%",
		textAlign: "center",
		color: "#FFFFFF",
		[theme.breakpoints.down("sm")]: {
			fontSize: "0.85em",
		},
		[theme.breakpoints.down("md")]: {
			fontSize: "1.5em",
		},
		[theme.breakpoints.down("xs")]: {
			fontSize: "0.60em",
		},
	},
	errorMsgSmall: {
		fontFamily: "Ubuntu",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: "1rem",
		lineHeight: "140%",
		textAlign: "center",
		color: "#FFFFFF",
		[theme.breakpoints.down("sm")]: {
			fontSize: "0.45em",
		},
		[theme.breakpoints.down("md")]: {
			fontSize: "0.75em",
		},
		[theme.breakpoints.down("xs")]: {
			fontSize: "0.10em",
		},
	},
	errMsgFix1: {
		marginTop: "-38%",
	},
	buttonHome: {
		textTransform: "none",
		fontSize: "0.75rem",
		lineHeight: 2.5,
		borderRadius: 3,
		width: "9%",
		marginLeft: "4%",
		marginTop: "5%",
		paddingLeft: "1%",
		paddingRight: "1%",
		marginRight: theme.spacing(4.375),
		[theme.breakpoints.down("md")]: {
			fontSize: "0.60rem",
			lineHeight: 2,
			marginTop: "5%",
			width: "10%",
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "0.30em",
			marginLeft: "5%",
			marginTop: "4%",
			width: "3%",
		},
		[theme.breakpoints.down("xs")]: {
			fontSize: "0.20em",
			padding: "0.5%",
			marginLeft: "12%",
			marginTop: "6%",
		},
	},
}));

export const ColorButton = withStyles((theme: Theme) => ({
	root: {
		color: "black",
		backgroundColor: "#FFFFFF",
		"&:hover": {
			color: "black",
			backgroundColor: "#FFFFFF",
		},
	},
}))(Button);
