import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	card: {
		background: theme.palette.common.white,
		border: "2px solid #ECECEC",
		"&:hover": {
			border: "2px solid #5B44BA",
			boxShadow: "0px 4px 4px rgba(91, 68, 186, 0.25)",
		},
	},
	allExpCard: {
		backgroundColor: "#5B44BA",
		border: "2px solid #858CDD",
		"&:hover": {
			border: "2px solid #FFFFFF",
			boxShadow: "0px 4px 4px #5B44BA",
		},
	},
	// CARD MEDIA
	cardMedia: {
		width: "100%",
		"& img": {
			height: 80,
		},
	},
	allExpCardMedia: {
		width: 100,
		padding: 10,
		borderRadius: 10,
		margin: "0 auto",
		backgroundColor: "#FFFFFF",

		"& img": {
			height: 80,
		},
	},

	// CARD CONTENT
	cardContent: {
		color: theme.palette.text.primary,
	},
	link: {
		color: "#5B44BA",
		fontWeight: 500,
	},
	cardInfo: {
		[theme.breakpoints.down("sm")]: {
			padding: "0 12px",
			paddingBottom: 20,
		},
	},
	description: {
		textAlign: "center",
		marginBottom: 12,
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
	},
	noImage: {
		width: "100%",
		height: 80,
		backgroundColor: theme.palette.primary.dark,
		// Below mobile size
		[theme.breakpoints.down("sm")]: {
			width: 250,
		},
	},
	provider: {
		color: theme.palette.text.primary,
		fontWeight: 500,
		marginBottom: 8,
	},
	cardAnalytics: {
		display: "flex",
		justifyContent: "space-between",
		margin: "8px 8px 12px 8px",
	},
	button: {
		width: 100,
		height: 24,
		padding: 0,
		margin: 0,
		backgroundColor: "#F6B92B",
		color: theme.palette.common.white,
		textTransform: "none",
		"&:hover": {
			backgroundColor: "#F6B92B",
		},
	},
	totalRuns: {
		backgroundColor: theme.palette.secondary.light,
		color: theme.palette.common.white,
	},
	allExptotalRuns: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.text.primary,
	},
	allExptotalCount: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.text.primary,
	},
	chaosInfo: {
		backgroundColor: "#F6B92B",
		color: theme.palette.common.white,
	},
	allExpLink: {
		color: theme.palette.common.white,
		fontWeight: 500,
	},
	title: {
		color: theme.palette.common.black,
	},
	allExpTitle: {
		color: theme.palette.common.white,
	},

	infoIcon: {
		color: theme.palette.common.white,
	},

	allExpimgMedia: {
		width: "100%",
		objectFit: "scale-down",
	},
	imgMedia: {
		width: 100,
		objectFit: "scale-down",
	},

	//Default properties

	mainCard: {
		width: "95%",
		borderRadius: 3,
		overflow: "hidden",
		fontSize: 16,
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		textAlign: "center",
		cursor: "pointer",
		// Above tablet size
		[theme.breakpoints.up("sm")]: {
			width: 250,
			margin: theme.spacing(2),
		},
		[theme.breakpoints.down(682)]: {
			width: "90%",
			margin: theme.spacing(2),
		},
	},
	mainCardMedia: {
		height: 100,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	maintotalRuns: {
		marginTop: 3,
		borderRadius: 4,
		padding: "2px 6px",
		height: 24,
		fontWeight: 500,
		fontSize: 14,
	},
	chaosInfoBase: {
		borderRadius: 4,
		padding: "2px 6px",
	},
	mainTitle: {
		fontSize: 18,
		margin: "12px 0",
		display: "flex",
		flexDirection: "column",
		[theme.breakpoints.down("sm")]: {
			margin: 0,
		},
	},

	expName: {},

	allExpName: { color: theme.palette.common.white },
}));
