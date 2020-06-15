import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	rootContainer: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	root: {
		padding: 16,
		fontSize: 18,
	},
	breadCrumbs: {
		marginTop: 16,
		marginLeft: 0,
		marginBottom: 32,
		[theme.breakpoints.up("md")]: {
			marginLeft: 64,
		},
	},
	body: {
		display: "flex",
		flexDirection: "row",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		},
	},
	content: {
		width: "60%",
		display: "flex",
		flexDirection: "column",
		alignItems: "start",
		marginLeft: 64,
		[theme.breakpoints.down("md")]: {
			width: "95%",
		},
	},
	contentHead: {
		display: "flex",
		flexDirection: "row",
	},
	info: {
		margin: "0 auto",
	},
	note: {
		marginTop: 32,
		fontWeight: "bold",
		color: theme.palette.warning.dark,
		margin: 0,
	},
	installLinks: {
		marginTop: 16,
	},
}));
