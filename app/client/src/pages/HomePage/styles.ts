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
