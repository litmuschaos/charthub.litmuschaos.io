import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	card: {
		width: "95%",
		background: theme.palette.background.paper,
		boxShadow: theme.shadows[4],
		borderRadius: 8,
		overflow: "hidden",
		fontSize: 14,
		margin: 16,
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		textAlign: "center",
		cursor: "pointer",
		// Above tablet size
		[theme.breakpoints.up("md")]: {
			width: 250,
		},
	},
	// CARD MEDIA
	cardMedia: {
		width: "100%",
		height: 100,
		backgroundColor: theme.palette.primary.dark,
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
		[theme.breakpoints.down("sm")]: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "start",
			padding: 8,
		},
	},
	cardInfo: {
		[theme.breakpoints.down("sm")]: {
			padding: "0 12px",
		},
	},
	title: {
		fontWeight: 600,
		fontSize: 18,
		color: theme.palette.primary.contrastText,
		margin: "12px 0",
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
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText,
		borderRadius: 9,
		padding: "3px 6px",
		fontWeight: 500,
		fontSize: 14,
	},
}));
