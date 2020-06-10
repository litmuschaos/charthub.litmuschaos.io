import { Button, Container, Icon, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Sort from "@material-ui/icons/Sort";
import * as React from "react";
import { useSelector } from "react-redux";
import {
	Charts,
	CustomBreadCrumbs,
	CustomButton,
	SearchBar,
	UsefulLinks,
} from "../../components";
import { history } from "../../redux/configureStore";
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
			<Grid container spacing={3}>
				<Grid item xs={3} style={{ paddingLeft: 150 }}>
					<CustomBreadCrumbs location={props.location.pathname} />
				</Grid>
				<Grid item xs={6}>
					<SearchBar
						searchToken={searchToken}
						handleSearch={handleSearch}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={2}>
					<CustomButton
						label="Back"
						handleClick={() => history.goBack()}
					/>
				</Grid>
				<Grid item xs={6}>
					<div className={classes.expHeader}>
						<Typography
							variant="h4"
							style={{ fontSize: "40px" }}
							gutterBottom
						>
							<b>{chartGroup.name}</b>
						</Typography>
						<Typography
							variant="h6"
							className={classes.description1}
						>
							Total experminents run count: 47
						</Typography>
					</div>
					<Typography
						variant="subtitle1"
						className={classes.description}
					>
						{chartGroup.categoryDescription}
					</Typography>
				</Grid>
				<Grid item xs>
					<div className={classes.customButton}>
						<CustomButton
							handleClick={() =>
								window.open(
									"https://docs.litmuschaos.io/docs/getstarted/"
								)
							}
							label="Install All Experiments"
						/>
					</div>
					<div style={{ marginTop: 45, marginLeft: 40 }}>
						<UsefulLinks />
					</div>
				</Grid>
			</Grid>
			<Container maxWidth="lg">
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						marginTop: 50,
						marginBottom: 20,
					}}
				>
					<Button
						style={{
							display: "flex",
							flexDirection: "row",
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
			<Charts experiments={displayExps} match={match} />
		</div>
	);
}

export default ExperimentsPage;
