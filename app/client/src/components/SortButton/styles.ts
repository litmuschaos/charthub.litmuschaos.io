import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
	sortText: {
		marginLeft: theme.spacing(1),
		color: theme.palette.primary.contrastText,
	},
	sortButton: {
		borderRadius: 4,
	},
	sortIcon: {
		marginBottom: 10,
	},
}));
