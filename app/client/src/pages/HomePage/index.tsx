import { Typography, Hidden } from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { SearchBar, Charts } from "../../components";
import Footer from "../../components/Footer";
import { RootState } from "../../redux/reducers";
import { useStyles } from "./styles";
import MainHeader from "../../components/Header";
import Stat from "../../components/Stats";
import { Experiment } from "../../redux/model";

function HomePage() {
	const classes = useStyles();
	const { chartData } = useSelector((state: RootState) => state);

	const [displayExps, setDisplayExps] = React.useState<Experiment[]>(
		chartData.allExperiments
	);
	React.useEffect(() => {
		setDisplayExps(chartData.allExperiments);
	}, [chartData.allExperiments]);

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
