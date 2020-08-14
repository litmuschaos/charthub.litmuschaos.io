import { IconButton, Tooltip, Link } from "@material-ui/core";
import React from "react";
import { formatCount } from "../../utils";
import { CardProps } from "./model";
import { useStyles } from "./styles";
import InfoIcon from "@material-ui/icons/Info";
import clsx from "clsx";

function CardContent(props: CardProps) {
	const {
		title,
		expGrp,
		urlToIcon,
		handleClick,
		handleExpGrpClick,
		experimentCount,
		description,
		totalRuns,
		chaosType,
		chartType,
	} = props;

	const classes = useStyles();

	return (
		<div className={classes.cardContent} onClick={handleClick}>
			<div className={classes.cardAnalytics}>
				{experimentCount ? (
					<span className={classes.expCount}>
						{experimentCount} Experiments
					</span>
				) : chaosType ? (
					<Tooltip
						TransitionProps={{ timeout: 400 }}
						title={
							chartType === "generic"
								? "Infra-Chaos :- Multiple applications might be impacted"
								: "Infra-Chaos :-  Multiple volumes sharing the same pool might be impacted"
						}
						placement="bottom-start"
					>
						<IconButton className={classes.button}>
							<InfoIcon className={classes.infoIcon} />
						</IconButton>
					</Tooltip>
				) : (
					<span />
				)}
				<span
					className={clsx(
						props.title !== "all-experiments"
							? classes.totalRuns
							: classes.allExptotalRuns,
						classes.maintotalRuns
					)}
				>
					{formatCount(totalRuns)} runs
				</span>
			</div>
			<div>
				{urlToIcon ? (
					<div
						className={clsx(
							props.title !== "all-experiments"
								? classes.cardMedia
								: classes.allExpCardMedia,
							classes.mainCardMedia
						)}
					>
						<img
							src={urlToIcon}
							className={
								props.title !== "all-experiments"
									? classes.imgMedia
									: classes.allExpimgMedia
							}
							alt="chart provider logo"
						/>
					</div>
				) : (
					<div className={classes.noImage}>Image</div>
				)}
				<div className={classes.cardInfo}>
					<div
						className={clsx(
							props.title !== "all-experiments"
								? classes.title
								: classes.allExpTitle,
							classes.mainTitle
						)}
					>
						<Link
							href="#"
							onClick={(e: any) => {
								e.preventDefault();
								e.stopPropagation();
								handleExpGrpClick(expGrp);
							}}
							className={clsx(
								props.title !== "all-experiments"
									? classes.link
									: classes.allExpLink
							)}
						>
							{expGrp}/
						</Link>
						{title}
					</div>
				</div>
				{description ? (
					<div className={classes.description}>{description}</div>
				) : (
					<span></span>
				)}
			</div>
		</div>
	);
}
export default CardContent;
