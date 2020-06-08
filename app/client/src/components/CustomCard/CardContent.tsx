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
			<div className={classes.totalRuns}>{totalRuns}</div>
			<div className={classes.expCount}>{experimentCount}</div>
			{urlToIcon ? (
				<img
					className={classes.cardMedia}
					src={urlToIcon}
					alt="chart provider logo"
				/>
			) : (
				<div className={classes.noImage} />
			)}
			<div className={classes.title}>{title}</div>
			<div className={classes.provider}>{provider}</div>
			<div className={classes.description}>{description}</div>
		</div>
	);
}
export default CardContent;
