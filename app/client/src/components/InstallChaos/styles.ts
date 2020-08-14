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

	modalEditor: {
		width: 850,
		marginLeft: "25%",
		marginTop: "3%",
	},
	btnImg: {
		paddingRight: 10,
	},
}));
