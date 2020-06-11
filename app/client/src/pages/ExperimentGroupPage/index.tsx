import * as React from "react";
import { useSelector } from "react-redux";
import {
	BackButton,
	Charts,
	CustomBreadCrumbs,
	CustomButton,
	ExperimentInfo,
	SearchBar,
	SortButton,
	UsefulLinks,
} from "../../components";
import { history } from "../../redux/configureStore";
import { Experiment, ExperimentGroup } from "../../redux/model";
import { RootState } from "../../redux/reducers";
import { getExpRunCount } from "../../utils";
import { useStyles } from "./styles";

function ExperimentsGroupPage(props: any) {
	const classes = useStyles();
	const match = props.match;
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

	const handleSort = () => {
		let payload: Experiment[] = [
			...displayExps,
		].sort((c1: Experiment, c2: Experiment) =>
			c1.name.localeCompare(c2.name)
		);
		try {
			if (JSON.stringify(payload) === JSON.stringify(displayExps))
				payload = [
					...displayExps,
				].sort((c1: Experiment, c2: Experiment) =>
					c2.name.localeCompare(c1.name)
				);
		} catch {
			console.error("Error Sorting Charts");
		}
		setDisplayExps(payload);
	};

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
	console.log(match);
	if (!chartGroup) {
		history.push("/404");
		return <></>;
	} else
		return (
			<div className={classes.root}>
				{/* BreadCrumbs + SearchBar */}
				<div className={classes.header}>
					<div className={classes.breadCrumbs}>
						<CustomBreadCrumbs location={props.location.pathname} />
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
							<BackButton />
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
						{/* Sort Button */}
						<SortButton handleClick={handleSort} />
						{/* Card component */}
						<Charts experiments={displayExps} match={match} />
					</div>
					{/* Install Experiments CTA + Usefull Links */}
					<div className={classes.info}>
						<div className={classes.installCTA}>
							<CustomButton
								handleClick={() =>
									history.push(
										`${match.url}/install-all-experiments`
									)
								}
								label="Install All Experiments"
							/>
						</div>
						<UsefulLinks
							links={chartGroup.links}
							maintainers={chartGroup.maintainers}
						/>
					</div>
				</div>
			</div>
		);
}

export default ExperimentsGroupPage;
