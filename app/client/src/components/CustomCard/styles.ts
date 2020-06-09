import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	card: {
		width: "100%",
		background: theme.palette.background.paper,
		boxShadow: theme.shadows[4],
		borderRadius: 8,
		overflow: "hidden",
		margin: 8,
		padding: 8,
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		alignItems: "center",
		// Above tablet size
		// [theme.breakpoints.up("md")]: {
		// 	width: 380,
		// 	height: 230,
		// 	padding: "4px 8px 8px 8px",
		// },
	},
	// CARD MEDIA
	cardMedia: {
		maxWidth: 120,
		float: "left",
		marginTop: 47,
		shapeOutside: "border-box",
		padding: "4px 10px 2px 10px",
	},
	// CARD CONTENT
	cardContent: {
		position: "relative",
		padding: 8,
		color: theme.palette.text.primary,
	},
	title: {
		fontWeight: 600,
		fontSize: 14,
		color: theme.palette.primary.contrastText,
		marginBottom: 12,
	},
	description: {
		fontSize: 12,
		textAlign: "justify",
		marginBottom: 12,
	},
	noImage: {
		width: "100%",
		height: 100,
	},
	provider: {
		color: theme.palette.text.primary,
		fontWeight: 500,
	},
	totalRuns: {},
	expCount: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText,
		borderRadius: 10,
		width: 150,
	},
}));
