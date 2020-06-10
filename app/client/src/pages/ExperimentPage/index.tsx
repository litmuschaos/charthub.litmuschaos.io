import * as React from "react";
import { useSelector } from "react-redux";
import {
	BackButton,
	CustomBreadCrumbs,
	ExperimentInfo,
	UsefulLinks,
} from "../../components";
import { history } from "../../redux/configureStore";
import { Experiment, ExperimentGroup } from "../../redux/model";
import { RootState } from "../../redux/reducers";
import { getExpRunCount } from "../../utils";
import { useStyles } from "./styles";

function ExperimentPage(props: any) {
	const classes = useStyles();
	const match = props.match;
	const chartGroudId: string = match.params.chartGroupId;
	const chartId: string = match.params.chartId;
	const { chartData, analyticsData } = useSelector(
		(state: RootState) => state
	);
	const chartGroup: ExperimentGroup = chartData.allExperimentGroups.filter(
		(g) => g.metadataName === chartGroudId
	)[0];
	const chart: Experiment =
		chartGroup &&
		chartGroup.experiments.filter((e) => e.metadataName === chartId)[0];

	if (!chartGroup || !chart) {
		history.push("/");
		return <></>;
	} else
		return (
			<div className={classes.root}>
				{/* BreadCrumbs */}
				<div className={classes.breadCrumbs}>
					<CustomBreadCrumbs location={props.location.pathname} />
				</div>

				<div className={classes.body}>
					<div className={classes.content}>
						{/* Back Butoon + Experiment info */}
						<div className={classes.contentHead}>
							{/* Back Button */}
							<BackButton />
							{/* Exp title + Exp run counts + description*/}
							<ExperimentInfo
								title={chart.name}
								description={chart.description}
								runCount={getExpRunCount(
									chart,
									analyticsData.expAnalytics
								)}
							/>
						</div>
						{/* TODOD: add body */}
					</div>
					{/* Install Experiments CTA + Usefull Links */}
					<div className={classes.info}>
						<UsefulLinks
							links={chartGroup.links}
							maintainers={chartGroup.maintainers}
						/>
					</div>
				</div>
			</div>
		);
}

export default ExperimentPage;
