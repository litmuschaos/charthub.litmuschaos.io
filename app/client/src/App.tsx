import React, { lazy, Suspense, useEffect } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { useStyles } from "./App-styles";
import { Loader } from "./components";
import withTheme from "./hoc/themeHoc";
import { useActions } from "./redux/actions";
import * as AnalyticsActions from "./redux/actions/analytics";
import * as GithubActions from "./redux/actions/github";
import { history } from "./redux/configureStore";

const HomePage = lazy(() => import("./pages/HomePage"));
const ExperimentPage = lazy(() => import("./pages/ExperimentPage"));

function Routes() {
	const classes = useStyles();

	return (
		<div className={classes.content}>
			<Switch>
				<Route exact={true} path="/" component={HomePage} />
				<Route
					exact={true}
					path="/:chartGroupId/:chartId"
					component={ExperimentPage}
				/>
				<Redirect to="/" />
			</Switch>
		</div>
	);
}

function App() {
	const githubActions = useActions(GithubActions);
	const analyticsActions = useActions(AnalyticsActions);
	const classes = useStyles();

	useEffect(() => {
		analyticsActions.loadAnalytics();
		githubActions.loadStarCount();
	});

	return (
		<Suspense fallback={<Loader />}>
			<Router history={history}>
				<div className={classes.root}>
					<div className={classes.appFrame}>
						<div className={classes.routeBody}>
							<Routes />
						</div>
					</div>
				</div>
			</Router>
		</Suspense>
	);
}

export default withTheme(App);
