import { makeStyles } from "@material-ui/core/styles";

// Component styles
export const useStyles = makeStyles((theme) => ({
	rootContainer: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	root: {
		height: "100%",
		textAlign: "center",
		padding: theme.spacing(4),
		marginTop: "50px",
		color: theme.palette.text.secondary,
		fontSize: 18,
	},
	error: {
		fontWeight: 500,
		color: theme.palette.primary.contrastText,
	},
	image: {
		marginTop: "50px",
		width: 150,
		color: theme.palette.secondary.main,
	},
}));
