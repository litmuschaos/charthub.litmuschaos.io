import { IconButton } from "@material-ui/core";
import Sort from "@material-ui/icons/SortTwoTone";
import * as React from "react";
import { useSelector } from "react-redux";
import {
	BackButton,
	Charts,
	CustomBreadCrumbs,
	CustomButton,
	ExperimentInfo,
	SearchBar,
	UsefulLinks,
} from "../../components";
import { Experiment } from "../../redux/model";
import { RootState } from "../../redux/reducers";
import { useStyles } from "./styles";

function ExperimentsPage(props: any) {
	const classes = useStyles();
	const match = props.match;
	const chartGroudId: string = match.params.chartGroupId;
	const chartData = useSelector((state: RootState) => state.chartData);
	const chartGroup = chartData.allExperimentGroups.filter(
		(g) => g.metadataName === chartGroudId
	)[0];
	const experiments = chartGroup ? chartGroup.experiments : [];
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
		const search: string = event.target.value as string;
		setsearchToken(search);
		const payload: Experiment[] = experiments.filter((exp: Experiment) => {
			return exp.name.toLowerCase().includes(search.toLowerCase());
		});
		setDisplayExps(payload);
	};

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
							runCount={47}
						/>
					</div>
					{/* Sort Button */}
					<IconButton className={classes.sort} onClick={handleSort}>
						<Sort />
					</IconButton>
					{/* Card component */}
					<Charts experiments={displayExps} match={match} />
				</div>
				{/* Install Experiments CTA + Usefull Links */}
				<div className={classes.info}>
					<div className={classes.installCTA}>
						<CustomButton
							handleClick={() =>
								window.open(
									"https://docs.litmuschaos.io/docs/getstarted/"
								)
							}
							label="Install All Experiments"
						/>
					</div>
					<UsefulLinks />
				</div>
			</div>
		</div>
	);
}

export default ExperimentsPage;
