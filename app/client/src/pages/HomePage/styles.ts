import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	rootContainer: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
	},
	root: {
		textAlign: "center",
	},
	mainDiv: {
		backgroundImage:
			"linear-gradient(82.18deg, #5B44BA -6.24%, #858CDD 142.26%)",
		height: 500,
		display: "flex",
		flexDirection: "column",
		[theme.breakpoints.down("xs")]: {
			height: 550,
		},
	},
	headerDiv: {
		display: "flex",
		flexDirection: "row",
		paddingTop: 60,
		marginLeft: 130,
		marginRight: 130,
		[theme.breakpoints.up("xl")]: {
			width: 1550,
			margin: "0 auto",
		},
		[theme.breakpoints.down("sm")]: {
			display: "flex",
			flexDirection: "row",
			paddingTop: 20,
			marginLeft: 50,
			marginRight: 50,
		},
		[theme.breakpoints.down("xs")]: {
			display: "flex",
			flexDirection: "row",
			paddingTop: 20,
			marginLeft: 20,
			marginRight: 20,
		},
	},
	headerText: {
		width: 650,
		height: 120,
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
	},
	mainHeader: {
		fontSize: "40px",
		fontWeight: 500,
		color: theme.palette.common.white,
		textAlign: "left",
		[theme.breakpoints.down(981)]: {
			fontSize: "35px",
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "25px",
			fontWeight: 500,
			marginBottom: 20,
		},
		[theme.breakpoints.down("xs")]: {
			fontSize: "25px",
			fontWeight: 500,
			marginBottom: 10,
		},
	},
	headerDesc: {
		fontSize: "16px",
		marginBottom: 20,
		color: theme.palette.common.white,
		textAlign: "left",
		maxWidth: 500,
		paddingTop: 20,
		[theme.breakpoints.down("md")]: {
			paddingTop: 0,
			maxWidth: "100%",
		},
	},
	headerImg: {
		marginTop: -50,
		marginRight: 50,
		[theme.breakpoints.down("md")]: {
			marginTop: -50,
			marginLeft: 30,
			marginRight: 0,
		},
	},
	searchBar: {
		flexGrow: 1,
		[theme.breakpoints.down("sm")]: {
			marginRight: 20,
		},
		[theme.breakpoints.down("xs")]: {
			marginRight: 0,
		},
	},
	searchDiv: {
		display: "flex",
		flexDirection: "row",
		marginLeft: 130,
		marginRight: 80,
		marginTop: 10,
		[theme.breakpoints.up("xl")]: {
			width: 1550,
			margin: "0 auto",
		},
		[theme.breakpoints.down("sm")]: {
			display: "flex",
			flexDirection: "column",
			width: "95%",
			marginLeft: 30,
			marginRight: 30,
			marginTop: 35,
		},
		[theme.breakpoints.down("xs")]: {
			marginTop: "10%",
			marginLeft: 10,
		},
		[theme.breakpoints.down(465)]: {
			marginTop: 90,
		},
		[theme.breakpoints.down(378)]: {
			marginTop: 135,
			marginLeft: 10,
			marginRight: 10,
		},
	},
	statsDiv: {
		marginTop: -10,
		flexGrow: 1,
		marginLeft: 10,
		[theme.breakpoints.down("sm")]: {
			width: "100%",
			marginLeft: -10,
		},
		[theme.breakpoints.down("xs")]: {
			width: "100%",
			marginLeft: 0,
			marginRight: 0,
		},
	},
	chartsDiv: {
		marginTop: -80,
		marginLeft: "8.55%",
		marginRight: "8.55%",
		backgroundColor: theme.palette.common.white,
		border: "1px solid rgba(0, 0, 0, 0.05)",
		borderRadius: "3px",
		[theme.breakpoints.up("xl")]: {
			width: 1550,
			margin: "0 auto",
			marginTop: -80,
		},
		[theme.breakpoints.down("md")]: {
			marginTop: -60,
		},
		[theme.breakpoints.down("sm")]: {
			marginTop: -80,
		},
		[theme.breakpoints.down(600)]: {
			marginTop: -90,
		},
		[theme.breakpoints.down(378)]: {
			marginTop: -30,
			marginLeft: "6%",
			marginRight: "6%",
		},
	},
}));
