// Material components
import { Typography } from "@material-ui/core";
import * as React from "react";
import Footer from "../../components/Footer";
import { useStyles } from "./styles";

function ErrorPage() {
	const classes = useStyles();

	return (
		<div className={classes.rootContainer}>
			<div className={classes.root}>
				<Typography variant="h1" className={classes.error}>
					404
				</Typography>
				<Typography variant="h2">
					The page you are looking for isn’t here
				</Typography>
				<p>
					You either tried some shady route or you came here by
					mistake. Whichever it is, try using the navigation or
					checkout some fancy links in the footer
				</p>
				<img
					alt="Under development"
					className={classes.image}
					src="/icons/litmus.svg"
				/>
			</div>
			{/* Footer */}
			<Footer />
		</div>
	);
}

export default ErrorPage;
