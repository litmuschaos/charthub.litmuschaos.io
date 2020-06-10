import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	root: {
		padding: 16,
	},
	header: {
		display: "flex",
		flexDirection: "column",
		position: "relative",
		[theme.breakpoints.up("md")]: {
			flexDirection: "row",
		},
	},
	breadCrumbs: {
		marginTop: 16,
		marginLeft: 0,
		position: "relative",
		marginBottom: 32,
		[theme.breakpoints.up("md")]: {
			position: "absolute",
			marginLeft: 64,
			marginBottom: 0,
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
	sort: {
		marginLeft: theme.spacing(1),
		color: theme.palette.primary.contrastText,
	},
	info: {
		margin: "0 auto",
	},
	installCTA: {
		marginBottom: 32,
	},
}));
