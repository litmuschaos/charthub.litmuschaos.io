import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
	searchField: {
		maxWidth: 400,
		height: 50,
		display: "flex",
		margin: "auto",
		justifyContent: "left",
		color: theme.palette.text.primary,
		marginBottom: 20,
	},
	searchIcon: {
		margin: "auto",
		marginLeft: 20,
		marginRight: 20,
		color: theme.palette.primary.contrastText,
	},
	textField: {
		width: "100%",
		fontSize: 18,
		marginLeft: theme.spacing(1),
	},
}));
