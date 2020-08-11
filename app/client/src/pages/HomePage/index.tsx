import { Typography, Hidden } from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChartGroups, SearchBar } from "../../components";
import Footer from "../../components/Footer";
import { useActions } from "../../redux/actions";
import * as ChartActions from "../../redux/actions/charts";
import { RootState } from "../../redux/reducers";
import { useStyles } from "./styles";
import MainHeader from "../../components/Header";
import Stat from "../../components/Stats";
function HomePage() {
	const classes = useStyles();
	const [searchToken, setsearchToken] = useState("");
	const chartData = useSelector((state: RootState) => state.chartData);
	const chartActions = useActions(ChartActions);

	useEffect(() => {
		chartActions.searchCharts("");
	}, []);

	const handleSearch = (event: React.ChangeEvent<{ value: unknown }>) => {
		setsearchToken(event.target.value as string);
		chartActions.searchCharts(event.target.value as string);
	};

	return (
		<div className={classes.rootContainer}>
			<MainHeader />
			<div className={classes.root}>
				<div className={classes.mainDiv}>
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
					<div className={classes.searchDiv}>
						<SearchBar
							searchToken={searchToken}
							handleSearch={handleSearch}
						/>
						<div className={classes.statsDiv}>
							<Stat />
						</div>
					</div>
				</div>
				<div className={classes.chartsDiv}>
					<ChartGroups
						experimentGroups={chartData.displayExperimentGroups}
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
