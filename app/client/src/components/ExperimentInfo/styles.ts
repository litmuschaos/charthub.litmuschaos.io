import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		color: theme.palette.text.secondary,
		fontSize: 18,
		margin: "0 32px",
	},
	expHeader: {
		fontWeight: "bold",
		fontSize: 36,
		marginBottom: 8,
	},
	expInfo: {
		fontWeight: "bold",
		marginBottom: 16,
	},
	expDesc: {
		maxWidth: "75%",
		marginBottom: 8,
	},
}));
