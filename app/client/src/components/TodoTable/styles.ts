import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
	paper: {
		width: "100%",
		minWidth: 260,
		display: "inline-block",
		color: theme.palette.primary.contrastText,
	},
	table: {
		width: "100%",
	},
	button: {
		color: theme.palette.text.primary,
	},
}));
