import { Paper, Typography } from "@material-ui/core";
import * as React from "react";
import { useStyles } from "./styles";

interface Props {
	size: number;
	color: "red" | "blue" | string;
}

export function HomeBox(props: Props) {
	const { size, ...other } = props;
	const classes = useStyles(props);

	return (
		<Paper className={classes.box} {...other}>
			<Typography variant="subtitle1" className={classes.text}>
				I'm an example how to handle dynamic styles based on props
			</Typography>
		</Paper>
	);
}
