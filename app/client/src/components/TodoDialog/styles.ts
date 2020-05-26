import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
	textField: {
		width: "80%",
		margin: 20,
	},
	button: {
		color: theme.palette.primary.contrastText,
	},
}));
