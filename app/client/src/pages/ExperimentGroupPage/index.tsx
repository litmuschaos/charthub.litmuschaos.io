import * as React from "react";
import { useSelector } from "react-redux";
import {
	BackButton,
	Charts,
	CustomBreadCrumbs,
	ExperimentInfo,
	SearchBar,
	UsefulLinks,
} from "../../components";
import Footer from "../../components/Footer";
import { history } from "../../redux/configureStore";
import { Experiment, ExperimentGroup } from "../../redux/model";
import { RootState } from "../../redux/reducers";
import { getExpRunCount } from "../../utils";
import { useStyles } from "./styles";
import MainHeader from "../../components/Header";

function ExperimentsGroupPage(props: any) {
	const classes = useStyles();
	const match = props.match;
	const path = match.url.split("/");
	const chartGroupId: string = match.params.chartGroupId;
	const { chartData, analyticsData } = useSelector(
		(state: RootState) => state
	);
	const chartGroup: ExperimentGroup = chartData.allExperimentGroups.filter(
		(g) => g.metadataName === chartGroupId
	)[0];
	const experiments: Experiment[] = chartGroup ? chartGroup.experiments : [];
	const [displayExps, setDisplayExps] = React.useState(experiments);
	const [searchToken, setsearchToken] = React.useState("");

	const handleSearch = (event: React.ChangeEvent<{ value: unknown }>) => {
		let search: string = event.target.value as string;
		setsearchToken(search);
		const tokens: string[] = search
			.toLowerCase()
			.split(" ")
			.filter((s) => s !== "");
		const payload: Experiment[] = experiments.filter((exp: Experiment) => {
			return tokens.every((s: string) =>
				exp.name.toLowerCase().includes(s)
			);
		});
		setDisplayExps(payload);
	};
	if (!chartGroup) {
		history.push("/");
		return <></>;
	} else
		return (
			<div className={classes.rootContainer}>
				<MainHeader />
				<div className={classes.root}>
					{/* BreadCrumbs + SearchBar */}
					<div className={classes.header}>
						<div className={classes.breadCrumbs}>
							<CustomBreadCrumbs
								location={props.location.pathname}
							/>
						</div>

						<SearchBar
							searchToken={searchToken}
							handleSearch={handleSearch}
						/>
					</div>

					<div className={classes.body}>
						<div className={classes.content}>
							{/* Back Butoon + Experiment info */}
							<div className={classes.contentHead}>
								{/* Back Button */}
								<BackButton
									path={path
										.slice(0, path.length - 1)
										.join("/")}
								/>
								{/* Exp title + Exp run counts + description*/}
								<ExperimentInfo
									title={chartGroup.name}
									description={chartGroup.categoryDescription}
									runCount={getExpRunCount(
										chartGroup.experiments,
										analyticsData.expAnalytics
									)}
								/>
							</div>
							{chartGroup.experiments.length !== 0 ? (
								<>
									{/* Card component */}
									<Charts
										experiments={displayExps}
										match={match}
									/>
								</>
							) : (
								<div className={classes.comingSoon}>
									Coming Soon
								</div>
							)}
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
				{/* Footer */}
				<Footer />
			</div>
		);
}

export default ExperimentsGroupPage;
