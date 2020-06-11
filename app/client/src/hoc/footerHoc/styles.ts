import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.secondary.dark,
		color: theme.palette.primary.main,
		width: "100%",
		padding: 8,
		marginTop: 40,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	statItem: {
		display: "block",
		margin: 24,
		textAlign: "center",
	},
	stat: {
		display: "flex",
		margin: "0 auto",
		justifyContent: "center",
		[theme.breakpoints.down("md")]: {
			flexDirection: "column",
		},
	},
	statValue: {
		fontWeight: 700,
	},
	commData: {
		display: "inline-block",
		fontWeight: 700,
		marginLeft: 8,
		color: theme.palette.primary.main,
	},
	commList: {
		display: "flex",
		alignItems: "center",
		marginTop: 8,
	},
	comm: {
		display: "flex",
		justifyContent: "space-around",
		width: "80%",
		marginTop: 16,
		marginLeft: "auto",
		marginRight: "auto",
		[theme.breakpoints.down("md")]: {
			flexDirection: "column",
			alignItems: "center",
		},
	},
	brand: {
		display: "flex",
		width: "80%",
		marginTop: 32,
		marginBottom: 32,
		marginLeft: "auto",
		marginRight: "auto",
	},
	brandData: {
		display: "flex",
		alignItems: "center",
		flexGrow: 1,
		[theme.breakpoints.down("md")]: {
			flexDirection: "column",
		},
	},
	brandLinks: {},
	brandLogo: {
		width: 150,
		float: "left",
		marginRight: 16,
	},
	brandCRight: {},
	brandLData: {
		display: "inline-block",
		marginLeft: 32,
		fontWeight: 700,
		color: theme.palette.primary.main,
	},
	commIcon: {
		color: theme.palette.secondary.main,
	},
	commMobile: {
		[theme.breakpoints.down("md")]: {
			margin: 24,
		},
	},
}));
