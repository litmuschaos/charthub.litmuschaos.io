import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		maxWidth: 600,
		display: "flex",
		flexDirection: "column",
		color: theme.palette.text.secondary,
		fontSize: 18,
		marginTop: 40,
	},
	expHeader: {
		fontWeight: "bold",
		fontSize: 24,
		marginBottom: 8,
		color: theme.palette.common.white,
	},
	expInfo: {
		marginTop: 10,
		marginLeft: 20,
		padding: "3px 10px 3px 10px",
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.common.white,
		borderRadius: 3,
		textAlign: "center",
	},
	expDesc: {
		marginBottom: 8,
		color: theme.palette.common.white,
	},
	expImg: {
		width: 100,
		height: 100,
		borderRadius: 10,
	},
	titleDiv: {
		display: "flex",
		flexDirection: "column",
		marginLeft: 20,
		marginTop: 10,
		width: 350,
	},
}));
