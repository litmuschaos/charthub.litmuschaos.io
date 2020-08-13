import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
	appBar: {
		width: "100%",
		height: "100%",
		backgroundImage:
			"linear-gradient(82.18deg, #5B44BA -6.24%, #858CDD 142.26%)",
		borderBottom: "1px solid rgba(255,255,255,0.2)",
	},
	mainLogo: {
		marginLeft: 110,
		marginRight: 30,
		[theme.breakpoints.down("sm")]: {
			marginLeft: 10,
			marginRight: 30,
		},
	},
	formControl: {
		marginTop: theme.spacing(3),
		marginBottom: 20,
		marginRight: 10,

		fontWeight: 700,
		"& > *": {
			width: "100%",
		},
	},
	headerDiv: {
		display: "flex",
		flexDirection: "row",
		marginLeft: "auto",
		marginRight: 120,
		[theme.breakpoints.down("sm")]: {
			marginLeft: "auto",
			marginRight: 0,
		},
	},
	whiteColor: {
		color: "white",
		paddingLeft: 20,
	},
	whiteColor1: {
		color: "white",
	},
	starImg: {
		width: 20,
		height: 20,
	},
	select: {
		"& ul": {
			backgroundColor: "#FFFFFF",
		},
		"& li": {
			color: "#000000",
			fontSize: 14,
		},
	},
	versionSelect: {
		width: 95,
		height: 40,
		backgroundColor: "rgba(0, 0, 0, 0.1)",
		borderRadius: 3,
	},
	starsBtn: {
		marginTop: 4.5,
		textTransform: "none",
		width: 95,
		height: 40,
		backgroundColor: "rgba(0, 0, 0, 0.1)",
		borderRadius: 3,
	},
	starsText: {
		color: "#FFFFFF",
		paddingLeft: 10,
	},
	contributeBtn: {
		margin: "auto",
		color: "#000000",
		fontWeight: 500,
		fontSize: "18px",
		cursor: "pointer",
	},
	headerFont: {
		color: "#FFFFFF",
		marginLeft: 20,
		marginTop: 12.5,
	},
	getStartedBtn: {
		width: 116,
		height: 46,
		color: "#FFFFFF",
		marginLeft: 20,
		borderColor: "#FFFFFF",
	},
	getStarted: {
		backgroundColor: "#5B44BA",
		borderRadius: 4,
		width: 230,
		height: 51,
		color: "#FFFFFF",
		margin: "auto",
		textTransform: "none",
	},
	handleStar: {
		borderRadius: 4,
		width: 230,
		height: 51,
		margin: "auto",
		textTransform: "none",
		color: "#000000",
		border: "2px solid #000000",
	},
	backdrop: {
		background: "rgba(33, 21, 86, 0.8)",
		backdropFilter: "blur(20px)",
	},
	menuStarBtn: {
		paddingLeft: 10,
		paddingBottom: 5,
	},
	menuItem: {
		outline: "none",
		"&:hover": {
			outline: "none",
		},
		"&:focus": {
			outline: "none",
		},
	},
}));

export default useStyles;
