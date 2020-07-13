import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "95%",
		fontSize: 18,
		color: theme.palette.text.secondary,
		margin: "16px 0",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		margin: "8px 0",
	},
	description: {
		margin: "8px 0",
	},
	linkBox: {
		backgroundColor: theme.palette.primary.main,
		padding: 8,
		borderRadius: 8,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	yamlLink: {
		width: "90%",
		whiteSpace: "pre-wrap",
		padding: "16px 8px",
		[theme.breakpoints.down("md")]: {
			fontSize: 14,
		},
	},
	done: {
		color: theme.palette.success.dark,
	},
	statusheading: {
		marginTop: -20,
		fontFamily: "Ubuntu",
		fontSize: 16,
		marginLeft: theme.spacing(2),
	},

	fixedContainer: {
		position: "fixed",
		padding: 2,
		left: "50%",
		top: "50%",
		transform: "translate(-50%, -50%)",
	},

	statusdescription: {
		width: 800,
		marginTop: 15,
		fontFamily: "Ubuntu",
		fontSize: 14,
		marginLeft: theme.spacing(2),
	},

	editorbackgroundfull: {
		backgroundColor: "#282a36",
		color: "#FFFFFF",
	},
	horizontalLineWhite: {
		marginTop: theme.spacing(4),
		backgroundColor: "#FFFFFF",
	},

	editorbuttons: {
		marginTop: theme.spacing(3),
	},

	editorcontainer: {
		marginTop: theme.spacing(4),
	},
	editorgrid: {
		overflow: "auto",
		maxHeight: theme.spacing(58),
	},

	editorpos: {
		marginBottom: theme.spacing(0),
		overflow: "auto",
		whiteSpace: "pre-wrap",
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

	modalEditor: {
		width: 850,
		marginLeft: "25%",
		marginTop: "3%",
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
}));
