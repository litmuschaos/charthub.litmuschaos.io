import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
	// Stats
	statItem: {
		display: "block",
		margin: theme.spacing(1),
		marginBottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.1)",
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 20,
		paddingLeft: 20,
		textAlign: "center",
		borderRadius: "4.8382px",
		[theme.breakpoints.down("sm")]: {
			width: "45%",
		},
	},
	stat: {
		color: theme.palette.common.white,
		display: "flex",
		margin: "0 auto",
		justifyContent: "center",
		flexWrap: "wrap",
	},
	statValue: {
		color: theme.palette.common.white,
		fontWeight: 700,
	},
}));
