import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		backgroundColor: "rgba(0,0,0,0.2)",
		borderRadius: "3px",
		borderLeft: "6px solid  #858CDD",
		marginBottom: 30,
		[theme.breakpoints.down("sm")]: {
			marginBottom: 10,
		},
	},
	mainDiv: {
		paddingTop: 20,
		paddingBottom: 40,
		paddingLeft: 20,
		color: theme.palette.common.white,
		[theme.breakpoints.down("sm")]: {
			paddingBottom: 10,
		},
	},
	mainText: {
		fontWeight: "bold",
		fontSize: 24,
		[theme.breakpoints.down("sm")]: {
			fontSize: 16,
		},
	},
	textDesc: {
		fontSize: 16,
		[theme.breakpoints.down("sm")]: {
			fontSize: 14,
		},
	},
	guideLink: {
		color: theme.palette.common.white,
		paddingLeft: 12,
		paddingTop: -10,
		[theme.breakpoints.down("sm")]: {
			fontSize: 14,
		},
	},
	closeIcon: {
		color: theme.palette.common.white,
	},
	imgDiv: {
		display: "block",
		paddingTop: 25,
		[theme.breakpoints.down("sm")]: {
			paddingTop: 10,
		},
	},
}));
