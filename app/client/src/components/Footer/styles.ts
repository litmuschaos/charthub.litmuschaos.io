import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: "#FAFBFD",
		color: theme.palette.primary.main,
		width: "100%",
		padding: 20,
		marginTop: 40,
	},

	footerContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: theme.spacing(4),
		marginLeft: 60,
		marginRight: 60,
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
			margin: theme.spacing(2),
		},
	},
	footerContainer1: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		marginTop: theme.spacing(4),
		marginLeft: theme.spacing(4),
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
			marginLeft: theme.spacing(1.5),
			marginRight: theme.spacing(1.5),
		},
	},

	footHeading: {
		fontWeight: 500,
		color: theme.palette.text.primary,
		marginBottom: 32,
		[theme.breakpoints.down("sm")]: {
			maxWidth: 100,
			marginBottom: 16,
		},
	},
	footerText: {
		textAlign: "center",
		marginTop: 30,
		marginBottom: 30,
		color: theme.palette.text.secondary,
	},

	copyright: {
		maxWidth: "20rem",

		[theme.breakpoints.down("sm")]: {
			maxWidth: "100%",
			marginLeft: "20%",
			marginRight: "20%",
		},
		[theme.breakpoints.down("xs")]: {
			maxWidth: "100%",
			marginLeft: 0,
			marginRight: 0,
		},
	},
	copyrightText: {
		lineHeight: "1.5",
		marginBottom: theme.spacing(2.125),
		color: theme.palette.text.disabled,
		"& a": {
			textDecoration: "none",
			color: theme.palette.text.disabled,
		},
	},

	logo: {
		width: "10rem",
		marginBottom: 50,
		cursor: "pointer",
	},

	// Community
	commData: {
		display: "inline-block",
		fontSize: "16px",
		marginBottom: 15,
		color: theme.palette.text.secondary,
		[theme.breakpoints.down("sm")]: {
			marginLeft: 0,
		},
	},
	commList: {
		display: "flex",
		alignItems: "center",
		marginTop: 8,
	},

	horizontalLine: {
		marginTop: 40,
		marginLeft: 60,
		marginRight: 60,
		height: 0.3,
		border: "0.5px solid #C4C4C4",
		boxSizing: "border-box",
	},
	footerDiv: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 50,
		[theme.breakpoints.down("sm")]: {
			marginLeft: "20%",
			marginRight: "20%",
		},
		[theme.breakpoints.down("xs")]: {
			marginLeft: 0,
		},
	},
	footerDiv1: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 50,
		[theme.breakpoints.down("sm")]: {
			marginLeft: "20%",
			marginRight: "15%",
		},
		[theme.breakpoints.down("xs")]: {
			marginLeft: 0,
		},
	},
}));
