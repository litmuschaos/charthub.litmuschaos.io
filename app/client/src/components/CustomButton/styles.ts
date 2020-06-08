import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
	button: {
		marginRight: theme.spacing(1),

		"&:hover": {
			color: theme.palette.getContrastText("rgb(10,55,171)"),
		},
	},
}));
