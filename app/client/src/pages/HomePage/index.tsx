import {
	Button,
	Container,
	FormControl,
	Icon,
	Select,
	Typography,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Search from "@material-ui/icons/SearchRounded";
import Sort from "@material-ui/icons/Sort";
import SubjectTwoToneIcon from "@material-ui/icons/SubjectTwoTone";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Charts, CustomButton } from "../../components";
import { RootState } from "../../redux/reducers";
import { useStyles } from "./styles";

function HomePage() {
	const classes = useStyles();
	const [selectChaos, setSelectChaos] = useState("All");
	const [selectContributors, setSelectContributors] = useState("All");
	const chartData = useSelector((state: RootState) => state.chartData);

	const handleChaosChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setSelectChaos(event.target.value as string);
	};
	const handleContributorChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setSelectContributors(event.target.value as string);
	};
	const handleSort = () => {
		// console.log("Sort button active!");
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

			<Paper
				component="form"
				className={classes.searchField}
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<Icon className={classes.searchIcon} aria-label="menu">
					<Search />
				</Icon>
				<InputBase
					className={classes.textField}
					placeholder="Search for Chaos Experiments"
					inputProps={{
						"aria-label": "search for chaos experiments",
					}}
				/>
			</Paper>

			<Container>
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
							<MenuItem value={"Cassandra"}>Cassandra</MenuItem>
							<MenuItem value={"Kubernetes"}>Kubernetes</MenuItem>
							<MenuItem value={"Kafka"}>Kafka</MenuItem>
							<MenuItem value={"OpenEBS"}>OpenEBS</MenuItem>
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
							<MenuItem value={"MayaData"}>MayaData</MenuItem>
							<MenuItem value={"Intuit"}>Intuit</MenuItem>
						</Select>
					</FormControl>

					<Button
						style={{
							display: "flex",
							flexDirection: "row",
							marginLeft: "auto",
							borderRadius: 4,
						}}
						onClick={handleSort}
					>
						<Icon style={{ marginBottom: 10 }}>
							<Sort />
						</Icon>
						<Typography className={classes.sort}>Sort</Typography>
					</Button>
				</div>
			</Container>

			{/* Card component */}
			<Charts experimentGroups={chartData.displayExperimentGroups} />
		</div>
	);
}

export default HomePage;
