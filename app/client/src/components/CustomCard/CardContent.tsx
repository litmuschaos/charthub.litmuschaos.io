import { IconButton, Tooltip, Zoom, Link } from "@material-ui/core";
import React from "react";
import { formatCount } from "../../utils";
import { CardProps } from "./model";
import { useStyles } from "./styles";
import InfoIcon from "@material-ui/icons/Info";

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
							style={{ color: "#5B44BA", fontWeight: 500 }}
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
