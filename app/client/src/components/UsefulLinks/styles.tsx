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
		fontSize: 14,
		marginBottom: 10,
		color: theme.palette.secondary.light,
	},
	linkListBox: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
	},
	staticType: {
		fontSize: 14,
		marginBottom: 10,
		color: theme.palette.primary.contrastText,
	},
	mainDiv: {
		padding: 30,
		justifyContent: "space-around",
		borderRadius: 10,
		borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
		paddingBottom: 20,
	},
	maintainerField: {
		borderRadius: 10,
	},
	maintainerlinkName: {
		fontSize: 14,
		marginBottom: 7,
		color: theme.palette.text.secondary,
	},
	maintainerlinkEmail: {
		fontSize: 14,
		marginBottom: 7,
		color: theme.palette.secondary.light,
	},
}));
