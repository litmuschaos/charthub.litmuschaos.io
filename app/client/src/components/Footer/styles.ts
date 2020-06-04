import { makeStyles, Theme } from "@material-ui/core/styles";
import { FormHelperText } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		border: "solid black",
		backgroundColor: "black",
		color: "white",
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
	},
	statValue: {
		fontWeight: 700,
	},
	commData: {
		display: "inline-block",
		fontWeight: 700,
		marginLeft: 8,
		color: "white",
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
		color: "white",
	},
}));
