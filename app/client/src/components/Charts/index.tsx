import React from "react";
import { useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { Experiment, ExperimentGroup } from "../../redux/model";
import { RootState } from "../../redux/reducers";
import CustomCard from "../CustomCard";
import { useStyles } from "./styles";

interface ChartProps {
	experimentGroups?: ExperimentGroup[];
	experiments?: Experiment[];
}

const getTotalRuns = (
	experiments: Experiment[],
	analyticsMap: Map<string, number>
): number => {
	return experiments.reduce((total, exp) => {
		try {
			let expRun: number = analyticsMap.get(exp.metadataName) ?? 0;
			return total + expRun;
		} catch {
			return total;
		}
	}, 0);
};

export function Charts(props: ChartProps) {
	const { experimentGroups } = props;
	const classes = useStyles();
	const analyticsData = useSelector(
		(state: RootState) => state.analyticsData
	);

	return (
		<div className={classes.root}>
			{experimentGroups &&
				experimentGroups.map((g: ExperimentGroup) => (
					<CustomCard
						key={g.metadataName}
						id={g.metadataName}
						title={g.name}
						handleClick={() =>
							history.push(`/charts/${g.metadataName}`)
						}
						experimentCount={g.experiments.length}
						provider={g.provider}
						description={g.description}
						// totalRuns={getTotalRuns(
						// 	g.experiments,
						// 	analyticsData.expAnalytics
						// )}
					/>
				))}
		</div>
	);
}
