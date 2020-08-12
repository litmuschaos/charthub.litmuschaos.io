import { IconButton, Tooltip, Zoom, Link } from "@material-ui/core";
import InfraIcon from "@material-ui/icons/NewReleasesTwoTone";
import React from "react";
import { formatCount } from "../../utils";
import { CardProps } from "./model";
import { useStyles } from "./styles";

function CardContent(props: CardProps) {
	const {
		title,
		expGrp,
		urlToIcon,
		handleClick,
		handleExpGrpClick,
		experimentCount,
		provider,
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
						TransitionComponent={Zoom}
						TransitionProps={{ timeout: 400 }}
						title={
							chartType === "generic"
								? "Infra-Chaos :- Multiple applications might be impacted"
								: "Infra-Chaos :-  Multiple volumes sharing the same pool might be impacted"
						}
					>
						<IconButton className={classes.button}>
							<InfraIcon fontSize="small" />
						</IconButton>
					</Tooltip>
				) : (
					<span />
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
					<div className={classes.title}>
						<Link
							href="#"
							onClick={(e: any) => {
								e.preventDefault();
								e.stopPropagation();
								handleExpGrpClick(expGrp);
							}}
							color="inherit"
						>
							{expGrp}
						</Link>
						/{title}
					</div>
					<div className={classes.provider}>
						Contributed by {provider}
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
