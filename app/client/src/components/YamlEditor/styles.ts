import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "95%",
		fontSize: 18,
		color: theme.palette.text.secondary,
		margin: "16px 0",
	},

	statusHeading: {
		marginTop: -20,
		fontFamily: "Ubuntu",
		fontSize: 16,
		marginLeft: theme.spacing(2),
	},

	statusDescription: {
		width: 800,
		marginTop: 15,
		fontFamily: "Ubuntu",
		fontSize: 14,
		marginLeft: theme.spacing(2),
	},

	editorBackgroundFull: {
		backgroundColor: "#282a36",
		color: "#FFFFFF",
	},

	horizontalLineWhite: {
		marginTop: theme.spacing(4),
		backgroundColor: "#FFFFFF",
	},

	editorButtonGrid: {
		marginTop: theme.spacing(3),
	},

	editorContainer: {
		marginTop: theme.spacing(4),
	},

	editorGrid: {
		overflow: "auto",
		maxHeight: theme.spacing(58),
	},

	extraSpace: {
		backgroundColor: "#282a36",
		height: theme.spacing(4),
	},

	editorButtons: {
		borderRadius: "3px",
		backgroundColor: "#282a36",
		boxSizing: "border-box",
		color: "#FFFFFF",
		borderColor: "#FFFFFF",
		paddingLeft: 25,
		width: 65,
		height: 45,
		marginLeft: 5,
	},

	editorButtonUndo: {
		borderRadius: "3px",
		backgroundColor: "#282a36",
		boxSizing: "border-box",
		color: "#FFFFFF",
		borderColor: "#FFFFFF",
		paddingLeft: 25,
		width: 65,
		height: 45,
		marginLeft: 10,
	},

	editorButtonDownload: {
		borderRadius: "3px",
		backgroundColor: "#282a36",
		boxSizing: "border-box",
		color: "#FFFFFF",
		borderColor: "#FFFFFF",
		paddingLeft: 25,
		width: 65,
		height: 45,
		marginLeft: 20,
	},

	editorButtonReplace: {
		borderRadius: "3px",
		backgroundColor: "#282a36",
		boxSizing: "border-box",
		color: "#FFFFFF",
		borderColor: "#FFFFFF",
		paddingLeft: 25,
		width: 65,
		height: 45,
		marginLeft: 50,
	},

	editorButtonSelectAll: {
		borderRadius: "3px",
		backgroundColor: "#282a36",
		boxSizing: "border-box",
		color: "#FFFFFF",
		borderColor: "#FFFFFF",
		paddingLeft: 25,
		width: 65,
		height: 45,
		marginLeft: 20,
	},

	editorButtonFullScreen: {
		borderRadius: "3px",
		backgroundColor: "#282a36",
		boxSizing: "border-box",
		color: "#FFFFFF",
		borderColor: "#282a36",
		paddingLeft: 30,
		paddingBottom: 15,
		width: 30,
		height: 30,
		marginLeft: 0,
	},

	saved: {
		width: 400,
		marginTop: theme.spacing(6),
		fontFamily: "Ubuntu",
		fontSize: 16,
		color: theme.palette.secondary.dark,
	},

	validationError: {
		position: "absolute",
		background: "#9f1d1d",
	},
}));
