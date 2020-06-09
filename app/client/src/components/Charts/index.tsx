import React from "react";
import { useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { Experiment } from "../../redux/model";
import { RootState } from "../../redux/reducers";
import CustomCard from "../CustomCard";
import { useStyles } from "./styles";

interface ChartProps {
	experiments: Experiment[];
	match: any;
}

const getTotalRuns = (
	expName: string,
	analyticsMap: Map<string, number>
): number => {
	try {
		return analyticsMap.get(expName) ?? 0;
	} catch {
		return 0;
	}
};

const getIconUrl = (chartMetadataName: string, chartGroup: string) =>
	"https://raw.githubusercontent.com/litmuschaos/chaos-charts/staging/charts/" +
	chartGroup +
	"/icons/" +
	chartMetadataName +
	".png";

export function Charts(props: ChartProps) {
	const { experiments, match } = props;
	const classes = useStyles();
	const analyticsData = useSelector(
		(state: RootState) => state.analyticsData
	);

	return (
		<div className={classes.root}>
			{experiments &&
				experiments.map((e: Experiment) => (
					<CustomCard
						key={e.metadataName}
						id={e.metadataName}
						title={e.name}
						urlToIcon={getIconUrl(
							e.metadataName,
							match.params.chartGroupId
						)}
						handleClick={() =>
							history.push(`${match.path}/${e.metadataName}`)
						}
						provider={e.provider}
						totalRuns={getTotalRuns(
							e.metadataName,
							analyticsData.expAnalytics
						)}
					/>
				))}
		</div>
	);
}
