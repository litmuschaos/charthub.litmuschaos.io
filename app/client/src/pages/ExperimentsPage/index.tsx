import { Button, Container, Icon, Typography } from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Sort from "@material-ui/icons/Sort";
import * as React from "react";
import { useSelector } from "react-redux";
import { CustomButton, SearchBar, UsefulLinks } from "../../components";
import { RootState } from "../../redux/reducers";
import { useStyles } from "./styles";

function ExperimentsPage(props: any) {
	console.log(props);
	const classes = useStyles();

	const chartGroudId: string = props.match.params.chartGroupId;
	const chartData = useSelector((state: RootState) => state.chartData);
	const chartGroup = chartData.allExperimentGroups.filter(
		(g) => g.metadataName === chartGroudId
	);

	const handleSort = () => {
		console.log("Sort button active!");
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={3} style={{ paddingLeft: 150 }}>
					<Breadcrumbs
						separator={<NavigateNextIcon fontSize="small" />}
						aria-label="breadcrumb"
					>
						<Link
							color="inherit"
							href="/"
							style={{ fontWeight: "bold" }}
						>
							Home
						</Link>
						<Typography
							color="textPrimary"
							style={{ fontWeight: "bold" }}
						>
							Kafka
						</Typography>
					</Breadcrumbs>
				</Grid>
				<Grid item xs={6}>
					<SearchBar />
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={2}>
					<p>Add back Button here </p>
				</Grid>
				<Grid item xs={6}>
					<div className={classes.expHeader}>
						<Typography
							variant="h4"
							style={{ fontSize: "40px" }}
							gutterBottom
						>
							<b>Kafka</b>
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
						Kafka is used for building real-time data pipelines and
						streaming apps. It is horizontally scalable,
						fault-tolerant, fast, and runs in production in
						thousands of companies.
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
							handleIcon={<></>}
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
			{/* <Charts experiments={chartGroup[0].experiments} /> */}
		</div>
	);
}

export default ExperimentsPage;
