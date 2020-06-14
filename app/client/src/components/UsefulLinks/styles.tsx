import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		display: "flex",
		backgroundColor: theme.palette.primary.light,
	},
	usefulLinks: {
		textAlign: "left",
	},
	heading: {
		fontSize: 18,
		marginBottom: 9,
		fontWeight: "bold",
		color: theme.palette.primary.contrastText,
	},
	linkType: {
		fontSize: 16,
		marginLeft: 40,
		marginBottom: 7,
		fontWeight: "bold",
		color: theme.palette.secondary.light,
	},
	linkListBox: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		paddingLeft: 32,
	},
	staticType: {
		fontSize: 16,
		marginLeft: 8,
		marginBottom: 8,
		fontWeight: "bold",
		color: theme.palette.primary.contrastText,
	},
	mainDiv: {
		padding: 30,
		justifyContent: "space-around",
		borderRadius: 10,
		backgroundColor: theme.palette.primary.light,
		paddingBottom: 20,
	},
	maintainerField: {
		marginLeft: 40,
		padding: 8,
		borderRadius: 10,
		backgroundColor: theme.palette.primary.dark,
	},
	maintainerlinkName: {
		fontSize: 16,
		paddingLeft: 10,
		marginBottom: 7,
		fontWeight: "bold",
		color: theme.palette.text.secondary,
	},
	maintainerlinkEmail: {
		fontSize: 16,
		paddingLeft: 10,
		marginBottom: 7,
		fontWeight: "bold",
		color: theme.palette.secondary.light,
	},
}));
