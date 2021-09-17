import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
	noExp: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		color: theme.palette.error.main,
		fontSize: "22px",
	},
	noExpImage: {
		width: "5rem",
		height: "5rem",
	},
}));
