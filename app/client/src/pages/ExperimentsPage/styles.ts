import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",
		textAlign: "center",
	},
	expHeader: {
		textAlign: "left",
		alignItems: "left",
	},
	description: {
		width: 720,
		height: 115,
		fontSize: 20,
		marginBottom: 20,
		textAlign: "left",
		color: theme.palette.text.secondary,
	},
	description1: {
		fontSize: 20,
		marginBottom: 20,
		fontWeight: "bold",
		color: theme.palette.text.secondary,
	},
	sort: {
		marginLeft: theme.spacing(1),
		color: theme.palette.primary.contrastText,
	},
	customButton: {
		display: "flex",
		flexDirection: "row",
		marginLeft: 75,
		marginTop: 0,
	},
}));
