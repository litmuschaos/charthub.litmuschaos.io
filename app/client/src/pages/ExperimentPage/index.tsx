import * as React from "react";
import { useSelector } from "react-redux";
import {
	BackButton,
	CustomBreadCrumbs,
	ExperimentInfo,
	InstallChaos,
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
	const chartGroupId: string = match.params.chartGroupId;
	const chartId: string = match.params.chartId;
	const { chartData, analyticsData } = useSelector(
		(state: RootState) => state
	);
	const chartGroup: ExperimentGroup = chartData.allExperimentGroups.filter(
		(g) => g.metadataName === chartGroupId
	)[0];
	const chart: Experiment =
		chartGroup &&
		chartGroup.experiments.filter((e) => e.metadataName === chartId)[0];

	if (!chartGroup || !chart) {
		history.push("/");
		return <></>;
	} else {
		const url: string[] = chart.chaosExpCRDLink.split("/");
		url[url.length - 1] = "rbac.yaml";
		const rbacUrl: string = url.join("/");
		url[url.length - 1] = "engine.yaml";
		const engineUrl: string = url.join("/");
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
						{/* TODO: add body */}
						<div>
							<div className={classes.note}>Note:</div>
							<div>
								<a
									href="https://github.com/litmuschaos/chaos-operator/blob/master/README.md"
									target="_"
								>
									Install Litmus Operator
								</a>
								: a tool for injecting Chaos Experiments
							</div>
						</div>
						<div className={classes.installLinks}>
							<InstallChaos
								title="Install this Choas Expermiment"
								description="You can install the Chaos Experiment using the following command"
								yamlLink={chart.chaosExpCRDLink}
							/>
							<InstallChaos
								title="Setup Service Account (RBAC)"
								description="Create a service account using the following command"
								yamlLink={rbacUrl}
							/>
							<InstallChaos
								title="Run Chaos Engine"
								description="You can run the chaos engine using the following command"
								yamlLink={engineUrl}
							/>
						</div>
					</div>
					{/* Install Experiments CTA + Usefull Links */}
					<div className={classes.info}>
						<UsefulLinks
							links={chart.links}
							maintainers={chart.maintainers}
							platforms={chart.platforms}
							maturity={chart.maturity}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ExperimentPage;
