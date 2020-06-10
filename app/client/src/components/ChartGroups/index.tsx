import React from "react";
import { useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { ExperimentGroup } from "../../redux/model";
import { RootState } from "../../redux/reducers";
import CustomCard from "../CustomCard";
import { useStyles } from "./styles";
import { getExpRunCount } from "../../utils";

interface ChartGroupProps {
	experimentGroups: ExperimentGroup[];
}

// const getTotalRuns = (
// 	experiments: Experiment[],
// 	analyticsMap: Map<string, number>
// ): number => {
// 	return experiments.reduce((total, exp) => {
// 		try {
// 			let expRun: number = analyticsMap.get(exp.metadataName) ?? 0;
// 			return total + expRun;
// 		} catch {
// 			return total;
// 		}
// 	}, 0);
// };

const getIconUrl = (chartMetadataName: string) =>
	"https://raw.githubusercontent.com/litmuschaos/chaos-charts/staging/charts/" +
	chartMetadataName +
	"/icons/" +
	chartMetadataName +
	".png";

export function ChartGroups(props: ChartGroupProps) {
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
						urlToIcon={getIconUrl(g.metadataName)}
						handleClick={() => history.push(`/${g.metadataName}`)}
						experimentCount={g.experiments.length}
						provider={g.provider}
						description={g.description}
						totalRuns={getExpRunCount(
							g.experiments,
							analyticsData.expAnalytics
						)}
					/>
				))}
		</div>
	);
}
