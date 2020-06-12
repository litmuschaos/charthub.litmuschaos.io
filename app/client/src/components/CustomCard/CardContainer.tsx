import React from "react";
import { useStyles } from "./styles";

function CardContainer(props: any) {
	const classes = useStyles();
	return <div className={classes.card}>{props.children}</div>;
}
export default CardContainer;
