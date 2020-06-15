import React from "react";
import { useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { ExperimentGroup } from "../../redux/model";
import { RootState } from "../../redux/reducers";
import { getExpRunCount } from "../../utils";
import CustomCard from "../CustomCard";
import { useStyles } from "./styles";

interface ChartGroupProps {
	experimentGroups: ExperimentGroup[];
}

const getIconUrl = (chartMetadataName: string) => {
	let baseURL: string = "";
	if (
		process.env.NODE_ENV.trim() === "development" ||
		process.env.NODE_ENV.trim() === "test"
	) {
		baseURL = `${window.location.protocol}//${window.location.hostname}:8080`;
	} else baseURL = "/api";
	return (
		baseURL +
		"/icon/" +
		chartMetadataName +
		"/" +
		chartMetadataName +
		".png"
	);
};

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
