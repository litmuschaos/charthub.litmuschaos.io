import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "95%",
		fontSize: 18,
		color: theme.palette.text.secondary,
		margin: "16px 0",
	},

	title: {
		fontSize: 16,
		marginBottom: 16,
		fontWeight: "bold",
		margin: "8px 0",
	},

	description: {
		margin: "8px 0",
		fontSize: 16,
		marginBottom: 16,
	},

	linkBox: {
		backgroundColor: " rgba(0, 0, 0, 0.02)",
		border: "1px solid  rgba(0, 0, 0, 0.05)",
		padding: 30,
		borderRadius: 8,
		display: "flex",
		flexDirection: "row",
		wordWrap: "break-word",
		justifyContent: "space-between",
		[theme.breakpoints.down("sm")]: {
			display: "flex",
			flexDirection: "column",
		},
	},

	buttonBox: {
		padding: 10,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		[theme.breakpoints.down("sm")]: {
			display: "flex",
			flexDirection: "row",
		},
	},

	copyBtn: {
		width: 95,
		height: 50,
		borderColor: theme.palette.text.primary,
		textTransform: "none",
		[theme.breakpoints.down("sm")]: {
			marginTop: 15,
		},
	},
	displayYamlBtn: {
		width: 95,
		height: 50,
		borderColor: theme.palette.text.primary,
		marginLeft: 20,
		textTransform: "none",
		[theme.breakpoints.down("sm")]: {
			marginTop: 15,
		},
	},
	yamlLink: {
		width: "90%",
		whiteSpace: "pre-wrap",
		paddingTop: "10px",
		fontSize: 16,
		[theme.breakpoints.down("md")]: {
			fontSize: 14,
			paddingLeft: "0px",
		},
		[theme.breakpoints.down("sm")]: {
			width: "100%",
			height: "fit-content",
			paddingLeft: "0px",
		},
	},

	done: {
		color: theme.palette.text.primary,
		paddingRight: 5,
	},

	modalContainer: {
		width: "80%",
		height: "60%",
		marginLeft: "10%",
		marginTop: "7.5%",
		marginBottom: "5.5%",
		background: "#1C1C1C",
		outline: "none",
		[theme.breakpoints.down("xs")]: {
			height: "35%",
		},
		[theme.breakpoints.down("sm")]: {
			height: "55%",
		},
		[theme.breakpoints.down("md")]: {
			height: "50%",
		},
	},

	modalContainerClose: {
		paddingLeft: "95%",
		[theme.breakpoints.down("xs")]: {
			paddingLeft: "85%",
		},
		[theme.breakpoints.down("sm")]: {
			paddingLeft: "87%",
		},
		[theme.breakpoints.down("md")]: {
			paddingLeft: "88%",
		},
	},

	errorText: {
		marginTop: theme.spacing(7.5),
		fontSize: "1rem",
		color: "red",
	},

	closeButtonStyle: {
		fontSize: "1rem",
		fontWeight: 1000,
		display: "inline-block",
		paddingTop: theme.spacing(0.375),
		paddingBottom: theme.spacing(0.375),
		paddingLeft: theme.spacing(1.5),
		paddingRight: theme.spacing(1.5),
		minHeight: 0,
		minWidth: 0,
		borderRadius: 3,
		color: "#FFFFFF",
		border: "1px solid rgba(255, 255, 255, 0.2)",
		marginTop: theme.spacing(2.5),
	},
	btnImg: {
		paddingRight: 10,
	},
}));
