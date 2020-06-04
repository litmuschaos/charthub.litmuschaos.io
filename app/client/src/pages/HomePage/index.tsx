import { Typography } from "@material-ui/core";
import * as React from "react";
import { useStyles } from "./styles";

export default function LandingPage() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant="h4" gutterBottom>
				Home Page
			</Typography>
		</div>
	);
}
