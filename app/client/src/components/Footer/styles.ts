import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.secondary.dark,
		color: theme.palette.primary.main,
		width: "100%",
		padding: 8,
		marginTop: 40,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},

	// Stats
	statItem: {
		display: "block",
		margin: theme.spacing(3),
		marginBottom: 0,
		textAlign: "center",
	},
	stat: {
		display: "flex",
		margin: "0 auto",
		justifyContent: "center",
		flexWrap: "wrap",
	},
	statValue: {
		fontWeight: 700,
	},

	footerContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: theme.spacing(4),
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
			margin: theme.spacing(2),
		},
	},

	footHeading: {
		fontWeight: "bold",
		color: theme.palette.secondary.main,
	},

	copyright: {
		width: "20rem",
	},
	copyrightText: {
		lineHeight: "1.5",
		marginBottom: theme.spacing(1),

		"& a": {
			textDecoration: "none",
			color: "inherit",
			fontWeight: "bold",
		},
	},

	logo: {
		width: "10rem",
	},

	// Community
	commData: {
		display: "inline-block",
		fontWeight: 700,
		marginLeft: 8,
		color: theme.palette.primary.main,
	},
	commList: {
		display: "flex",
		alignItems: "center",
		marginTop: 8,
	},
	comm: {
		display: "flex",
		justifyContent: "space-around",
		width: "80%",
		marginTop: 16,
		marginLeft: "auto",
		marginRight: "auto",
		[theme.breakpoints.down("md")]: {
			flexDirection: "column",
			alignItems: "center",
		},
	},

	commIcon: {
		color: theme.palette.secondary.main,
	},
}));
