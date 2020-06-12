import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "95%",
		fontSize: 18,
		color: theme.palette.text.secondary,
		margin: "16px 0",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		margin: "8px 0",
	},
	description: {
		margin: "8px 0",
	},
	linkBox: {
		backgroundColor: theme.palette.primary.main,
		padding: 8,
		borderRadius: 8,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	yamlLink: {
		width: "90%",
		whiteSpace: "pre-wrap",
		padding: "16px 8px",
	},
	done: {
		color: theme.palette.success.dark,
	},
}));
