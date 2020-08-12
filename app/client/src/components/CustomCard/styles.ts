import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	card: {
		width: "95%",
		background: theme.palette.common.white,
		borderRadius: 3,
		overflow: "hidden",
		fontSize: 16,
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		textAlign: "center",
		border: "2px solid #ECECEC",
		"&:hover": {
			border: "2px solid #5B44BA",
		},
		cursor: "pointer",

		// Above tablet size
		[theme.breakpoints.up("sm")]: {
			width: 250,
			margin: theme.spacing(2),
		},
	},
	// CARD MEDIA
	cardMedia: {
		width: "100%",
		height: 100,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		"& img": {
			height: 80,
		},
	},
	// CARD CONTENT
	cardContent: {
		color: theme.palette.text.primary,
	},
	cardBody: {
		// Below mobile size
		// [theme.breakpoints.down("sm")]: {
		// 	display: "flex",
		// 	flexDirection: "row",
		// 	justifyContent: "start",
		// 	padding: 8,
		// },
	},
	cardInfo: {
		[theme.breakpoints.down("sm")]: {
			padding: "0 12px",
		},
	},
	title: {
		fontSize: 18,
		color: theme.palette.common.black,
		margin: "12px 0",
		display: "flex",
		flexDirection: "column",
		[theme.breakpoints.down("sm")]: {
			margin: 0,
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
	expCount: {
		color: theme.palette.secondary.contrastText,
		fontWeight: 600,
		marginTop: 3,
	},
	button: {
		padding: 0,
		margin: 0,
		color: theme.palette.warning.dark,
	},
	totalRuns: {
		backgroundColor: theme.palette.secondary.light,
		color: theme.palette.common.white,
		borderRadius: 4,
		padding: "3px 6px",
		fontWeight: 500,
		fontSize: 14,
	},
	infoIcon: {
		color: theme.palette.error.dark,
	},
}));
