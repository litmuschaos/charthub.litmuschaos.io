import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",
		textAlign: "center",
	},
	description: {
		width: 796,
		fontSize: 20,
		display: "flex",
		margin: "auto",
		marginBottom: 10,
		color: theme.palette.text.primary,
	},
	description1: {
		fontSize: 20,
		marginBottom: 20,
		fontWeight: "bold",
		color: theme.palette.text.primary,
	},
	searchField: {
		width: 400,
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
	formControl: {
		minWidth: 200,
		display: "flex",
		flexDirection: "row",
	},
	selectOption: {
		float: "right",
		minWidth: 150,
		maxHeight: 30,
		marginLeft: 10,
		paddingLeft: 20,
		textAlign: "left",
		backgroundColor: theme.palette.primary.main,
		borderRadius: 4,
	},
	sort: {
		marginLeft: theme.spacing(1),
		color: theme.palette.primary.contrastText,
	},
	headerButton: {
		position: "absolute",
		right: 88,
	},
}));
