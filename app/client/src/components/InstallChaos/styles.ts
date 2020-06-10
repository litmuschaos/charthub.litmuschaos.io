import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		fontSize: 18,
		color: theme.palette.text.secondary,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	description: {},
	linkBox: {
		backgroundColor: theme.palette.primary.main,
		padding: 8,
		borderRadius: 8,
	},
	yamlLink: {
		width: "90%",
		whiteSpace: "pre-wrap",
		padding: "16px 8px",
	},
	button: {},
}));
