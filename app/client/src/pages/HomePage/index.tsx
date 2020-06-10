import {
	Button,
	Container,
	FormControl,
	Icon,
	Select,
	Typography,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Sort from "@material-ui/icons/SortTwoTone";
import SubjectTwoToneIcon from "@material-ui/icons/SubjectTwoTone";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
	ChartGroups,
	CustomButton,
	SearchBar,
	SortButton,
} from "../../components";
import { useActions } from "../../redux/actions";
import * as ChartActions from "../../redux/actions/charts";
import { RootState } from "../../redux/reducers";
import { useStyles } from "./styles";

function HomePage() {
	const classes = useStyles();
	const [selectChaos, setSelectChaos] = useState("All");
	const [selectContributors, setSelectContributors] = useState("All");
	const [searchToken, setsearchToken] = useState("");
	const chartData = useSelector((state: RootState) => state.chartData);
	const chartActions = useActions(ChartActions);

	const handleChaosChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setsearchToken("");
		setSelectChaos(event.target.value as string);
		chartActions.filterCharts(
			event.target.value as string,
			selectContributors
		);
	};
	const handleContributorChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setsearchToken("");
		setSelectContributors(event.target.value as string);
		chartActions.filterCharts(selectChaos, event.target.value as string);
	};
	const handleSort = () => {
		chartActions.sortCharts();
	};
	const handleSearch = (event: React.ChangeEvent<{ value: unknown }>) => {
		setsearchToken(event.target.value as string);
		setSelectChaos("All");
		setSelectContributors("All");
		chartActions.searchCharts(event.target.value as string);
	};

	return (
		<div className={classes.root}>
			<div className={classes.headerButton}>
				<CustomButton
					handleClick={() =>
						window.open(
							"https://docs.litmuschaos.io/docs/getstarted/"
						)
					}
					label="Visit Docs"
					handleIcon={<SubjectTwoToneIcon />}
				/>
			</div>
			<Typography variant="h4" style={{ fontSize: "40px" }} gutterBottom>
				<b>Chaos Chart for Kubernetes</b>
			</Typography>
			<Typography variant="subtitle1" className={classes.description}>
				Charts are pre-defined chaos experiments. Use these charts to
				inject chaos into cloud native applications and Kubernetes
				infrastructure.
			</Typography>
			<Typography variant="h6" className={classes.description1}>
				Browse . Run . Contribute
			</Typography>

			<SearchBar searchToken={searchToken} handleSearch={handleSearch} />
			<Container maxWidth="lg">
				<div
					style={{
						display: "flex",
						//flexDirection: "row",
						marginTop: 64,
						marginBottom: 24,
						width: "100%",
					}}
				>
					<FormControl className={classes.formControl}>
						<Typography style={{ float: "left", marginTop: 2 }}>
							Chaos for :
						</Typography>
						<Select
							className={classes.selectOption}
							disableUnderline={true}
							labelId="change-chaos"
							value={selectChaos}
							onChange={handleChaosChange}
						>
							<MenuItem value={"All"}>All</MenuItem>
							{chartData.chaosFilter.map((f) => (
								<MenuItem value={f}>{f}</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl className={classes.formControl}>
						<Typography
							style={{
								float: "left",
								marginTop: 2,
								marginLeft: 80,
							}}
						>
							Contributors :
						</Typography>
						<Select
							className={classes.selectOption}
							disableUnderline={true}
							labelId="change-contributors"
							value={selectContributors}
							onChange={handleContributorChange}
						>
							<MenuItem value={"All"}>All</MenuItem>
							{chartData.contributorFilter.map((f) => (
								<MenuItem value={f}>{f}</MenuItem>
							))}
						</Select>
					</FormControl>
					<div className={classes.sort}>
						<SortButton handleClick={handleSort} />
					</div>
				</div>
			</Container>

			{/* Card component */}
			<ChartGroups experimentGroups={chartData.displayExperimentGroups} />
		</div>
	);
}

export default HomePage;
