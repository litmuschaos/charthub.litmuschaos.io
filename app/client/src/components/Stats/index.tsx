import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { formatCount } from "../../utils";
import { Typography } from "@material-ui/core";
import { useStyles } from "./styles";
interface StatItem {
	key: string;
	value: string;
	desc: string;
}

function Stat() {
	const classes = useStyles();
	const { githubData, analyticsData, chartData } = useSelector(
		(state: RootState) => state
	);

	const opInstalls =
		analyticsData.chaosOperatorCount != undefined
			? analyticsData.chaosOperatorCount.toString()
			: "0";
	const githubStars = formatCount(githubData.star_count);
	const expRuns =
		analyticsData.totalExpRuns != undefined
			? analyticsData.totalExpRuns.toString()
			: "0";
	const expCount = formatCount(chartData.totalExpCount);
	// const opInstalls = formatCount(analyticsData.chaosOperatorCount);

	const stat: StatItem[] = [
		{ key: "expCount", value: expCount, desc: "Experiments" },
		{
			key: "opInstalls",
			value: opInstalls,
			desc: "Installed",
		},
		{
			key: "expRuns",
			value: expRuns,
			desc: "Experiment Runs",
		},
		{ key: "githubStars", value: githubStars, desc: "Github Stars" },
	];
	const createStatItem = (s: StatItem) => {
		return (
			<div key={s.key} className={classes.statItem}>
				<Typography variant="h5" className={classes.statValue}>
					{s.value}
				</Typography>
				<Typography variant="caption">{s.desc}</Typography>
			</div>
		);
	};
	return (
		<div className={classes.stat}>
			{stat.map((s: StatItem) => createStatItem(s))}
		</div>
	);
}

export default Stat;
