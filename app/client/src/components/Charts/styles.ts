import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
		[theme.breakpoints.up("md")]: {
			flexDirection: "row",
		},
	},
}));
