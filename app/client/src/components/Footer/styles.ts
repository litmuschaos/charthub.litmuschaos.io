import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: "#FAFBFD",
		color: theme.palette.primary.main,
		width: "100%",
		padding: 8,
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

	footHeading: {
		fontWeight: 500,
		color: theme.palette.text.primary,
		marginBottom: 32,
	},
	community: {},
	footerText: {
		textAlign: "center",
		marginTop: 30,
		marginBottom: 30,
		color: theme.palette.text.secondary,
	},

	copyright: {
		width: "20rem",
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
	},

	// Community
	commData: {
		display: "inline-block",
		marginLeft: 8,
		fontSize: "16px",
		marginBottom: 15,
		color: theme.palette.text.secondary,
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
	footerItem: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		[theme.breakpoints.down("sm")]: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-around",
		},
	},
}));
