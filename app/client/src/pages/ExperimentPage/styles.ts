import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	rootContainer: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
	},
	root: {
		fontSize: 18,
	},
	mainDiv: {
		backgroundImage:
			"linear-gradient(82.18deg, #5B44BA -6.24%, #858CDD 142.26%)",
		height: 500,
		flexGrow: 1,
		display: "flex",
		flexDirection: "column",
	},
	content: {
		width: "60%",
		display: "flex",
		flexDirection: "column",
		alignItems: "start",
		marginLeft: 64,
		[theme.breakpoints.down("md")]: {
			width: "100%",
			marginLeft: 0,
		},
	},
	contentHead: {
		display: "flex",
		flexDirection: "column",
	},
	info: {
		margin: "0 auto",
	},
	note: {
		marginTop: 32,
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 16,
		color: theme.palette.common.black,
		margin: 0,
	},
	installLinks: {
		marginTop: 16,
		[theme.breakpoints.down("md")]: {
			width: "100%",
		},
	},
	headerDiv: {
		marginLeft: 130,
		marginTop: 30,
	},
	expInfoDiv: {
		paddingLeft: 20,
		paddingRight: 20,
	},
	expMain: {
		marginLeft: 10,
	},
	detailDiv: {
		marginTop: "-5%",
		marginLeft: "8.55%",
		marginRight: "8.55%",
		backgroundColor: "#FFFFFF",
		border: "1px solid rgba(0, 0, 0, 0.05)",
		borderRadius: "3px",
		padding: "50px 50px 50px 50px",
	},
	horizontalLine: {
		marginTop: 40,
		borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
	},
}));
