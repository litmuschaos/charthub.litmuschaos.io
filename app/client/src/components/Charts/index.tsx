import React from "react";
import { history } from "../../redux/configureStore";
import { Experiment } from "../../redux/model";
import CustomCard from "../CustomCard";
import { useStyles } from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
interface ChartProps {
	experiments: Experiment[];
	handleSearch: (token: string) => void;
}

const getIconUrl = (
	chartMetadataName: string,
	chartGroup: string,
	version: string
) => {
	let baseURL: string = "";
	if (
		process.env.NODE_ENV.trim() === "development" ||
		process.env.NODE_ENV.trim() === "test"
	) {
		baseURL = `${window.location.protocol}//${window.location.hostname}:8080`;
	} else baseURL = "/api";
	if (chartMetadataName === "all-experiments")
		return (
			baseURL +
			"/icon/" +
			version +
			"/" +
			chartGroup +
			"/" +
			chartGroup +
			".png"
		);
	return (
		baseURL +
		"/icon/" +
		version +
		"/" +
		chartGroup +
		"/" +
		chartMetadataName +
		".png"
	);
};

export function Charts(props: ChartProps) {
	const { experiments, handleSearch } = props;
	const classes = useStyles();
	const { versionData } = useSelector((state: RootState) => state);

	return (
		<div className={classes.root}>
			{experiments &&
				experiments.map((e: Experiment) => (
					<CustomCard
						key={e.expGroup + "-" + e.metadataName}
						id={e.metadataName}
						title={e.name}
						expGrp={e.expGroup || ""}
						urlToIcon={getIconUrl(
							e.metadataName,
							e.expGroup || "",
							versionData.currentVersion
						)}
						handleClick={() =>
							history.push(`/${e.expGroup}/${e.metadataName}`)
						}
						handleExpGrpClick={handleSearch}
						provider={e.provider}
						totalRuns={e.totalRuns || 0}
						chaosType={e.chaosType}
						chartType={e.expGroup || ""}
					/>
				))}
		</div>
	);
}
