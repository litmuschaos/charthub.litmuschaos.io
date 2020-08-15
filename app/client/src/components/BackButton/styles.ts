import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	backBtn: {
		textDecoration: "none",
	},
	backText: {
		fontSize: 15,
		color: theme.palette.common.white,
		paddingLeft: 6,
		textDecoration: "none",
	},
}));
