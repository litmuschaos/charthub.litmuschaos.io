import React from "react";
import { CardProps } from "./model";
import { useStyles } from "./styles";

const formatCount = (count: number | undefined): string => {
	if (count)
		return count >= 1000 ? (count / 1000).toFixed(1) + "k+" : count + "";
	return "";
};

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
			<div className={classes.cardAnalytics}>
				{experimentCount ? (
					<span className={classes.expCount}>
						{experimentCount} Experiments
					</span>
				) : (
					<></>
				)}
				<span className={classes.totalRuns}>
					{formatCount(totalRuns)} runs
				</span>
			</div>
			<div className={classes.cardBody}>
				{urlToIcon ? (
					<div className={classes.cardMedia}>
						<img src={urlToIcon} alt="chart provider logo" />
					</div>
				) : (
					<div className={classes.noImage}>Image</div>
				)}
				<div className={classes.cardInfo}>
					<div className={classes.title}>{title}</div>
					<div className={classes.provider}>
						Contributed by {provider}
					</div>
				</div>
				{description ? (
					<div className={classes.description}>{description}</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}
export default CardContent;
