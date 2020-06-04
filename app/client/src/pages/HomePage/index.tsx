import { Typography } from "@material-ui/core";
import * as React from "react";
import { useStyles } from "./styles";

function HomePage() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Typography variant="h4" gutterBottom>
				Home Page
			</Typography>
		</div>
	);
}

export default HomePage;
