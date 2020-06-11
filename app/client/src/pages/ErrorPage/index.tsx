// Material components
import Grid from "@material-ui/core/Grid/index";
import { Typography, Button, Container } from "@material-ui/core";
import { GridSpacing } from "@material-ui/core/Grid";
import * as React from "react";
import { history } from "../../redux/configureStore";
import { useStyles } from "./styles";
import Box from "@material-ui/core/Box";

function ErrorPage() {
	const classes = useStyles();

	const routeChange = () => {
		let path = `/home`;
		history.push(path);
	};

	return (
		<div className={classes.root}>
			<Box
				display="flex"
				flexDirection="col"
				justifyContent="center"
				width="100%"
			>
				<div className={classes.contentWrapper}>
					<Typography variant="h1">
						404: The page you are looking for isn’t here
					</Typography>
					<Typography variant="subtitle2">
						You either tried some shady route or you came here by
						mistake. Whichever it is, try using the navigation
					</Typography>
					<img
						alt="Under development"
						className={classes.image}
						src="/icons/litmus.svg"
					/>

					<div className="goHome">
						<Box
							display="flex"
							flexDirection="row"
							justifyContent="center"
							p={1}
							m={1}
						>
							<Button
								variant="outlined"
								className={classes.goHome}
								onClick={routeChange}
							>
								Home
							</Button>
						</Box>
					</div>
				</div>
			</Box>
		</div>
	);
}

export default ErrorPage;
