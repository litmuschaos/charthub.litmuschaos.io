import React, { lazy, Suspense, useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { useStyles } from "./App-styles";
import { AppDrawer, Loader } from "./components";
import withFooter from "./hoc/footerHoc";
import withTheme from "./hoc/themeHoc";
import { useActions } from "./redux/actions";
import * as AnalyticsActions from "./redux/actions/analytics";
import * as GithubActions from "./redux/actions/github";
import * as VersionActions from "./redux/actions/versions";
import { history } from "./redux/configureStore";

const HomePage = lazy(() => import("./pages/HomePage"));
const ExperimentsPage = lazy(() => import("./pages/ExperimentsPage"));

function Routes() {
	const classes = useStyles();

	return (
		<div className={classes.content}>
			<Switch>
				<Route exact={true} path="/" component={withFooter(HomePage)} />
				<Route
					exact={true}
					path="/home"
					component={withFooter(HomePage)}
				/>
				<Route
					exact={true}
					path="/experiments"
					component={withFooter(ExperimentsPage)}
				/>
			</Switch>
		</div>
	);
}

function App() {
	const githubActions = useActions(GithubActions);
	const analyticsActions = useActions(AnalyticsActions);
	const versionActions = useActions(VersionActions);
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(true);

	useEffect(() => {
		analyticsActions.loadAnalytics();
		versionActions.loadVersions();
		githubActions.loadStarCount();
		githubActions.loadContributors();
	}, []);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Suspense fallback={<Loader />}>
			<Router history={history}>
				<div className={classes.root}>
					<div className={classes.appFrame}>
						<AppDrawer
							handleDrawerToggle={handleDrawerToggle}
							mobileOpen={mobileOpen}
						/>
						<Routes />
					</div>
				</div>
			</Router>
		</Suspense>
	);
}

export default withTheme(App);