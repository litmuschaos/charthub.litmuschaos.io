import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		display: "flex",
		backgroundColor: theme.palette.primary.light,
	},
	usefulLinks: {
		marginLeft: 30,
		textAlign: "left",
	},
	heading: {
		fontSize: 18,
		paddingTop: 25,
		marginBottom: 9,
		fontWeight: "bold",
		color: theme.palette.primary.contrastText,
	},
	linkType: {
		fontSize: 16,
		marginLeft: 32,
		marginBottom: 7,
		fontWeight: "bold",
		color: theme.palette.secondary.light,
	},
	mainDiv: {
		width: 320,
		justifyContent: "space-around",
		borderRadius: 10,
		backgroundColor: theme.palette.primary.light,
	},
	maintainerField: {
		width: 190,
		marginLeft: 32,
		paddingTop: 7,
		paddingBottom: 7,
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
