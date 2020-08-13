import { Typography, Hidden } from "@material-ui/core";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { SearchBar, Charts } from "../../components";
import Footer from "../../components/Footer";
import { RootState } from "../../redux/reducers";
import { useStyles } from "./styles";
import MainHeader from "../../components/Header";
import Stat from "../../components/Stats";
import { Experiment, ExperimentGroup } from "../../redux/model";
import { getExpRunCount } from "../../utils";

function HomePage() {
	const classes = useStyles();
	const { analyticsData, chartData } = useSelector(
		(state: RootState) => state
	);

	const [experiments, setExperiments] = React.useState<Experiment[]>([]);
	const [displayExps, setDisplayExps] = React.useState<Experiment[]>([]);
	const [searchToken, setsearchToken] = React.useState("");

	useEffect(() => {
		const exps: Experiment[] = [];
		chartData.allExperimentGroups.forEach((expg: ExperimentGroup) => {
			expg.experiments.forEach((exp: Experiment) => {
				exp.expGroup = expg.metadataName;
				exp.totalRuns = getExpRunCount(exp, analyticsData.expAnalytics);
				exps.push(exp);
			});
		});
		exps.sort((c1: Experiment, c2: Experiment) => {
			if (c1.totalRuns !== undefined && c2.totalRuns !== undefined)
				return c2.totalRuns - c1.totalRuns;
			return 0;
		});
		setExperiments(exps);
		setDisplayExps(exps);
	}, [chartData.allExperimentGroups, analyticsData.expAnalytics]);

	const handleSearch = (
		event: React.ChangeEvent<{ value: unknown }> | undefined,
		token: string | undefined
	) => {
		let search: string =
			event !== undefined ? (event.target.value as string) : token || "";
		setsearchToken(search);
		const tokens: string[] = search
			.toLowerCase()
			.split(" ")
			.filter((s) => s !== "");
		const payload: Experiment[] = experiments.filter((exp: Experiment) => {
			return tokens.every(
				(s: string) =>
					exp.name.toLowerCase().includes(s) ||
					(exp.expGroup !== undefined
						? exp.expGroup.toLowerCase().includes(s)
						: false)
			);
		});
		setDisplayExps(payload);
	};

	return (
		<div className={classes.rootContainer}>
			<MainHeader />
			<div className={classes.root}>
				<div className={classes.mainDiv}>
					{/* Header component */}
					<div className={classes.headerDiv}>
						<div className={classes.headerText}>
							<Typography className={classes.mainHeader}>
								Chaos Charts for Kubernetes
							</Typography>
							<Typography className={classes.headerDesc}>
								Charts are pre-defined chaos experiments. Use
								these charts to inject chaos into cloud native
								applications and Kubernetes infrastructure.
							</Typography>
						</div>
						<Hidden smDown>
							<div style={{ marginLeft: "auto" }}>
								<img
									src="icons/chaos-bird.png"
									alt="Chaos Bird Experiment"
									className={classes.headerImg}
								/>
							</div>
						</Hidden>
					</div>
					{/* SearchBar and Stats */}
					<div className={classes.searchDiv}>
						<div className={classes.searchBar}>
							<SearchBar
								searchToken={searchToken}
								handleSearch={handleSearch}
							/>
						</div>
						<div className={classes.statsDiv}>
							<Stat />
						</div>
					</div>
				</div>
				{/* Charts Div */}
				<div className={classes.chartsDiv}>
					<Charts
						experiments={displayExps}
						handleSearch={(token) => handleSearch(undefined, token)}
					/>
				</div>
			</div>
			{/* Footer */}
			<div style={{ marginTop: "auto" }}>
				<Footer />
			</div>
		</div>
	);
}

export default HomePage;
