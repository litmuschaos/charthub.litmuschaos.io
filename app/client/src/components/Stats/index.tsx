import { Typography } from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { numberFormatter } from "../../utils";
import { useStyles } from "./styles";
interface StatItem {
	key: string;
	value: string;
	desc: string;
}

function Stat() {
	const classes = useStyles();
	const { githubData, chartData, dockerPullData } = useSelector(
		(state: RootState) => state
	);

	const githubStars =
		githubData.star_count !== undefined
			? numberFormatter(githubData.star_count)
			: "0";

	const expCount =
		chartData.totalExpCount !== undefined
			? numberFormatter(chartData.totalExpCount)
			: "0";
	// const opInstalls = formatCount(analyticsData.chaosOperatorCount);

	const stat: StatItem[] = [
		{ key: "expCount", value: expCount, desc: "Experiments" },
		{ key: "dockerPulls", value: numberFormatter(dockerPullData.pull_count), desc: "Docker Pulls" },
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
