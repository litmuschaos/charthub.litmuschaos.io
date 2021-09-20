import { Hidden, Typography } from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { Charts, SearchBar } from "../../components";
import Footer from "../../components/Footer";
import MainHeader from "../../components/Header";
import Stat from "../../components/Stats";
import { Experiment } from "../../redux/model";
import { RootState } from "../../redux/reducers";
import "../../scrollbar.css";
import { useStyles } from "./styles";

function HomePage() {
	const classes = useStyles();
	const { chartData } = useSelector((state: RootState) => state);

	const [displayExps, setDisplayExps] = React.useState<Experiment[]>(
		chartData.allExperiments
	);
	React.useEffect(() => {
		setDisplayExps(chartData.allExperiments);
	}, [chartData.allExperiments]);

	React.useEffect(() => {
		window.scrollTo(0, 0);
	});

	const [searchToken, setsearchToken] = React.useState("");

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
		const payload: Experiment[] = chartData.allExperiments.filter(
			(exp: Experiment) => {
				return tokens.every(
					(s: string) =>
						exp.name.toLowerCase().includes(s) ||
						(exp.expGroup !== undefined
							? exp.expGroup.toLowerCase().includes(s)
							: false)
				);
			}
		);
		setDisplayExps(payload);
		window.scrollTo(0, 0);
	};

	return (
		<div className="scrollbar scrollbar-primary">
			<div className={classes.rootContainer}>
				<MainHeader />
				<div className={classes.root}>
					<div className={classes.mainDiv}>
						{/* Header component */}
						<div className={classes.headerDiv}>
							<div className={classes.headerText}>
								<Typography className={classes.mainHeader}>
									One Stop for your Chaos Engineering
									Experiments
								</Typography>
								<Typography className={classes.headerDesc}>
									Litmus ChaosHub is an open-source
									marketplace hosting all the different chaos
									experiments offered by Litmus. The
									experiments are declarative and tunable as
									per your requirements. Use the hub interface
									to tune them, deploy them, and take that
									step towards resilience.
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
							handleSearch={(token) =>
								handleSearch(undefined, token)
							}
						/>
					</div>
				</div>
				{/* Footer */}
				<div style={{ marginTop: "auto" }}>
					<Footer />
				</div>
			</div>
		</div>
	);
}

export default HomePage;
