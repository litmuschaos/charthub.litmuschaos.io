import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
		[theme.breakpoints.down("md")]: {
			flexDirection: "column",
			width: "100%",
		},
	},
}));
