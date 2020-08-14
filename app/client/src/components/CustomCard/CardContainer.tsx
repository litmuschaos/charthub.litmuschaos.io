import React from "react";
import { useStyles } from "./styles";
import clsx from "clsx";

function CardContainer(props: any) {
	const classes = useStyles();
	return (
		<div
			key={props.key}
			className={clsx(
				props.children.props.title !== "all-experiments"
					? classes.card
					: classes.allExpCard,
				classes.mainCard
			)}
		>
			{props.children}
		</div>
	);
}
export default CardContainer;
