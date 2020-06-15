import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	spinner: {
		margin: "0 auto",
		color: theme.palette.secondary.dark,
	},
}));
