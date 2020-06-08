import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		[theme.breakpoints.up("md")]: {
			flexDirection: "row",
		},
	},
}));
