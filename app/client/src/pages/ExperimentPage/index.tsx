import * as React from 'react';
import { useSelector } from 'react-redux';
import { BackButton, ExperimentInfo, InstallChaos, UsefulLinks, ExperimentHeader } from '../../components';
import Footer from '../../components/Footer';
import { history } from '../../redux/configureStore';
import { ExperimentGroup, Link } from '../../redux/model';
import { RootState } from '../../redux/reducers';
import { getExpRunCount } from '../../utils';
import { useStyles } from './styles';
import MainHeader from '../../components/Header';
import DeveloperGuide from '../../components/DeveloperGuide';
import '../../scrollbar.css';

const getIconUrl = (path: any) => {
	let baseURL: string = '';
	if (process.env.NODE_ENV.trim() === 'development' || process.env.NODE_ENV.trim() === 'test') {
		baseURL = `${window.location.protocol}//${window.location.hostname}:8080`;
	} else baseURL = '/api';
	if (path[2] === 'all-experiments') return baseURL + '/icon/' + path[1] + '/' + path[1] + '.png';
	return baseURL + '/icon/' + path[1] + '/' + path[2] + '.png';
};

function ExperimentPage(props: any) {
	const classes = useStyles();
	const match = props.match;
	const path = match.url.split('/');
	const chartGroupId: string = match.params.chartGroupId;
	const chartId: string = match.params.chartId;
	const { chartData, analyticsData, versionData } = useSelector((state: RootState) => state);
	const chartGroup: ExperimentGroup = chartData.allExperimentGroups.filter((g) => g.metadataName === chartGroupId)[0];
	const chart: any =
		chartId === 'all-experiments'
			? chartGroup
			: chartGroup && chartGroup.experiments.filter((e) => e.metadataName === chartId)[0];

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (!chartGroup || !chart) {
		history.push('/');
		return <div />;
	} else {
		const hubUrl: string = `https://hub.litmuschaos.io/api/chaos/${versionData.currentVersion}?file=${chart.chaosExpCRDLink.split(
			'/chaos-charts/master/'
		)[1]}`;
		let rbacUrl: string = '',
			engineUrl: string = '',
			expCount: number = 0,
			videoURL: string = '';
		if (JSON.stringify(chartGroup) !== JSON.stringify(chart)) {
			const url: string[] = hubUrl.split('/');
			url[url.length - 1] = 'rbac.yaml';
			rbacUrl = url.join('/');
			url[url.length - 1] = 'engine.yaml';
			engineUrl = url.join('/');
			expCount = getExpRunCount(chart, analyticsData.expAnalytics);
			const video: any = chart.links.filter((l: Link) => l.name === 'Video')[0];
			videoURL = video ? video.url : '';
		} else {
			expCount = getExpRunCount(chart.experiments, analyticsData.expAnalytics);
		}

		return (
			<div className="scrollbar scrollbar-primary">
				<div className={classes.rootContainer}>
					<MainHeader />
					<div className={classes.root}>
						<div className={classes.mainDiv}>
							<div className={classes.contentHead}>
								<div className={classes.headerDiv}>
									{/* Back Button */}
									<BackButton path="/" />
									{/* Exp title + Exp run counts + description*/}
									<div className={classes.expMain}>
										<ExperimentHeader
											title={chart.name}
											description={chart.description}
											runCount={expCount}
											urlToIcon={getIconUrl(path)}
										/>
									</div>
								</div>
							</div>
						</div>
						{/* Overlapping Div */}
						<div className={classes.overlapDiv}>
							{/* Developer Guide Component */}
							<DeveloperGuide links={chart.links} />
							{/* Experiment Info */}
							<div className={classes.detailDiv}>
								<div className={classes.expInfo}>
									<div className={classes.expInfoDiv}>
										<ExperimentInfo description={chart.description} videoURL={videoURL} />
										<div
											style={{
												marginTop: 'auto',
												marginBottom: 40
											}}
										>
											<hr className={classes.horizontalLine} />
											<div>
												<div className={classes.note}>PRE-REQUISITE:</div>
												<div>
													<a href="https://docs.litmuschaos.io/docs/getstarted/" target="_">
														Install Litmus Operator
													</a>
													: a tool for injecting Chaos Experiments
												</div>
											</div>
											<hr className={classes.horizontalLine} />
										</div>
									</div>
									{/* Useful Links Section */}
									<div className={classes.info}>
										<UsefulLinks
											links={chart.links}
											maintainers={chart.maintainers}
											platforms={chart.platforms}
											maturity={chart.maturity}
										/>
									</div>
								</div>
								{/* Install Chaos Section */}
								<div className={classes.installLinks}>
									<InstallChaos
										title="Install this Chaos Expermiment"
										description="You can install the Chaos Experiment using the following command"
										yamlLink={hubUrl}
									/>
									{rbacUrl && (
										<InstallChaos
											title="Setup Service Account (RBAC)"
											description="Create a service account using the following command"
											yamlLink={rbacUrl}
										/>
									)}
									{engineUrl && (
										<InstallChaos
											title="Sample Chaos Engine"
											description="Copy and edit this sample Chaos Engine yaml according to your application needs"
											yamlLink={engineUrl}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
					{/* Footer */}
					<Footer />
				</div>
			</div>
		);
	}
}

export default ExperimentPage;
