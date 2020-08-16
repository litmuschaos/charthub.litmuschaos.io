import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
	appBar: {
		width: "100%",
		height: "100%",
		backgroundImage:
			"linear-gradient(82.18deg, #5B44BA -6.24%, #858CDD 142.26%)",
		borderBottom: "1px solid rgba(255,255,255,0.2)",
	},
	toolbarDiv: {
		[theme.breakpoints.up("xl")]: {
			width: 1590,
			margin: "0 auto",
		},
	},
	mainLogo: {
		width: 102,
		height: 40,
		marginLeft: 110,
		marginRight: 30,
		cursor: "pointer",
		[theme.breakpoints.up("xl")]: {
			marginLeft: 0,
			marginRight: 30,
		},
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
		[theme.breakpoints.up("xl")]: {
			marginRight: 0,
		},
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
			backgroundColor: theme.palette.common.white,
		},
		"& li": {
			color: theme.palette.common.black,
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
		marginTop: 4,
		textTransform: "none",
		width: 95,
		height: 40,
		backgroundColor: "rgba(0, 0, 0, 0.1)",
		borderRadius: 3,
		"&:hover": {
			background: "rgba(0, 0, 0, 0.1)",
		},
	},
	starsText: {
		color: theme.palette.common.white,
		paddingLeft: 7,
	},
	contributeBtn: {
		margin: "auto",
		color: "#000000",
		fontWeight: 500,
		fontSize: "18px",
		cursor: "pointer",
	},
	headerFont: {
		color: theme.palette.common.white,
		marginLeft: 20,
		marginTop: 12.5,
		fontSize: 14,
	},
	getStartedBtn: {
		width: 116,
		height: 46,
		color: theme.palette.common.white,
		marginLeft: 20,
		borderColor: theme.palette.common.white,
		textTransform: "none",
		fontSize: 14,
	},
	getStarted: {
		backgroundColor: "#5B44BA",
		borderRadius: 4,
		width: 230,
		height: 51,
		color: theme.palette.common.white,
		margin: "auto",
		textTransform: "none",
		"&:hover": {
			backgroundColor: "#5B44BA",
		},
	},
	handleStar: {
		borderRadius: 4,
		width: 230,
		height: 51,
		margin: "auto",
		textTransform: "none",
		color: theme.palette.common.black,
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
	menuItemClose: {
		outline: "none",
		"&:hover": {
			outline: "none",
		},
		"&:focus": {
			outline: "none",
		},
		color: theme.palette.common.white,
		top: 0,
		right: 0,
		position: "fixed",
	},
	closeBtn: {
		color: theme.palette.common.white,
	},
}));

export default useStyles;
