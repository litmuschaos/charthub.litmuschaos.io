import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
	searchField: {
		height: 60,
		display: "flex",
		justifyContent: "left",
		backgroundColor: theme.palette.common.white,
		border: "1px solid rgba(0, 0, 0, 0.05)",
		marginBottom: 20,
	},
	searchIcon: {
		margin: "auto",
		marginLeft: 20,
		color: theme.palette.primary.contrastText,
	},
	textField: {
		width: "100%",
		fontSize: 18,
		margin: "0 8px",
	},
}));
