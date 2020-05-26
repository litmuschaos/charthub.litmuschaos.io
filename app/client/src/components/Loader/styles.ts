import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		display: "flex",
	},
	spinner: {
		margin: "0 auto",
		color: theme.palette.secondary.dark,
	},
}));
