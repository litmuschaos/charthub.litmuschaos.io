import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		padding: 16,
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
	},
	contentHead: {
		display: "flex",
		flexDirection: "row",
	},
	info: {
		margin: "0 auto",
	},
}));
