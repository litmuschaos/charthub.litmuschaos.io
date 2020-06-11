import { makeStyles, Theme } from "@material-ui/core/styles";

// Component styles
export const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
		height: "100%",
		textAlign: "center",
		overflow: "auto",
		scrollBehavior: "smooth",
	},
	contentWrapper: {
		marginTop: "50px",
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	image: {
		display: "inline-block",
		marginTop: "50px",
		maxWidth: "100%",
		width: "150px",
		color: theme.palette.secondary.main,
	},
	goHome: {
		color: theme.palette.text.secondary,
	},
}));
