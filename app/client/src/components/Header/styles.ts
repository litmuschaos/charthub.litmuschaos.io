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
		width: "10%",

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
	},
	whiteColor: {
		color: "white",
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
}));

export default useStyles;
