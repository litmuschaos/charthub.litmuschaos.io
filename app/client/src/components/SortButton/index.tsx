import { Button, Typography, Icon } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import Sort from "@material-ui/icons/SortTwoTone";

export function SortButton(props: any) {
	const classes = useStyles();
	return (
		<Button className={classes.sortButton} onClick={props.handleClick}>
			<Icon className={classes.sortIcon}>
				<Sort />
			</Icon>
			<Typography className={classes.sortText}> Sort </Typography>
		</Button>
	);
}
