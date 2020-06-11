import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",
		textAlign: "center",
		paddingTop: 16,
	},
	title: {
		fontSize: 40,
		color: theme.palette.primary.contrastText,
	},
	description: {
		fontSize: 20,
		maxWidth: 800,
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
		marginLeft: 30,
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
		marginRight: "auto",
		[theme.breakpoints.up("md")]: {
			marginRight: "0",
			marginLeft: "auto",
			marginTop: -16,
		},
	},
	headerButton: {
		position: "relative",
		[theme.breakpoints.up("lg")]: {
			position: "absolute",
			top: 30,
			right: 90,
		},
	},
	filter: {
		display: "flex",
		flexDirection: "row",
		marginTop: 64,
		marginBottom: 40,
		marginLeft: "auto",
		marginRight: "auto",
		width: "95%",
		[theme.breakpoints.down("md")]: {
			flexDirection: "column",
			"& > *": {
				marginBottom: 16,
			},
		},
	},
}));
