import { Button, Typography } from "@material-ui/core";
import React from "react";
import { history } from "../../redux/configureStore";
import { useStyles } from "./styles";

export function BackButton(props: { path: string }) {
	const classes = useStyles();
	return (
		<div data-cy="BackButton">
			<Button onClick={() => history.push(props.path)}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						textTransform: "none",
					}}
				>
					<img src="/icons/back.svg" />
					<Typography className={classes.backText}>Back</Typography>
				</div>
			</Button>
		</div>
	);
}
