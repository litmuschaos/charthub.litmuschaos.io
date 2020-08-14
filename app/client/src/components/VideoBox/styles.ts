import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	videoBox: {
		maxWidth: "100%",
		maxHeight: `calc((60vw - 2.5rem) / (16 / 9))`,
		[theme.breakpoints.down("sm")]: {
			maxHeight: `calc((100vw - 2.5rem) / (16 / 9))`,
		},
	},
	videoDiv: {
		padding: "1rem",
		[theme.breakpoints.down("sm")]: {
			padding: "0",
		},
	},
}));
