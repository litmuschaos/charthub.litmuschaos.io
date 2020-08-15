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
		[theme.breakpoints.down("xs")]: {
			height: 550,
		},
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
	expInfoDiv: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "column",
		paddingLeft: 20,
		paddingRight: 20,
	},
	info: {
		margin: "0 auto",
		width: "25%",
		[theme.breakpoints.down("xs")]: {
			marginRight: "auto",
			width: "100%",
		},
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
		[theme.breakpoints.down("md")]: {
			marginLeft: 80,
			marginTop: 10,
		},
		[theme.breakpoints.down("sm")]: {
			marginLeft: 10,
			marginRight: 10,
			marginTop: 0,
		},
	},

	expMain: {
		marginLeft: 10,
	},
	detailDiv: {
		backgroundColor: "#FFFFFF",
		border: "1px solid rgba(0, 0, 0, 0.05)",
		borderRadius: "3px",
		padding: "50px 50px 50px 50px",
		[theme.breakpoints.down("xs")]: {
			padding: "10px 10px 10px 10px",
		},
	},
	overlapDiv: {
		marginTop: -300,
		marginLeft: "5.75%",
		marginRight: "5.75%",
		borderRadius: "3px",
		padding: "50px 50px 50px 50px",
		[theme.breakpoints.down("sm")]: {
			marginTop: -250,
			marginLeft: 0,
			marginRight: 0,
			padding: "10px 10px 10px 10px",
		},
		[theme.breakpoints.down("xs")]: {
			marginTop: -300,
			marginLeft: 0,
			marginRight: 0,
			padding: "10px 10px 10px 10px",
		},
	},
	expInfo: {
		display: "flex",
		flexDirection: "row",
		[theme.breakpoints.down("xs")]: {
			display: "flex",
			flexDirection: "column-reverse",
		},
	},
	horizontalLine: {
		marginTop: 40,
		height: 0.3,
		marginRight: "5%",
		border: "0.5px solid #C4C4C4",
		boxSizing: "border-box",
	},
}));
