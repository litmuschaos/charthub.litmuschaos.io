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
		padding: 8,
		borderRadius: 8,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},

	yamlLink: {
		width: "90%",
		whiteSpace: "pre-wrap",
		paddingTop: "16px",
		paddingLeft: "20px",
		fontSize: 16,
		[theme.breakpoints.down("md")]: {
			fontSize: 14,
		},
	},

	done: {
		color: theme.palette.success.dark,
	},

	modalEditor: {
		width: 850,
		marginLeft: "25%",
		marginTop: "3%",
	},
}));
