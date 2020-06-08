import React from "react";
import { CardProps } from "./model";
import { useStyles } from "./styles";

function CardContent(props: CardProps) {
	const {
		title,
		urlToIcon,
		handleClick,
		experimentCount,
		provider,
		description,
		totalRuns,
	} = props;

	const classes = useStyles();

	return (
		<div className={classes.cardContent} onClick={handleClick}>
			{/* <div className={classes.totalRuns}>{totalRuns}</div> */}
			<div className={classes.expCount}>
				{experimentCount} Experiments
			</div>
			{urlToIcon ? (
				<img
					className={classes.cardMedia}
					src={urlToIcon}
					alt="chart provider logo"
				/>
			) : (
				<div className={classes.noImage}>Image</div>
			)}
			<div className={classes.title}>{title}</div>
			<div className={classes.provider}>Contributed by {provider}</div>
			<div className={classes.description}>{description}</div>
		</div>
	);
}
export default CardContent;
