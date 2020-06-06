import React, { lazy, Suspense, useEffect } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { useStyles } from "./App-styles";
import { AppDrawer, Loader } from "./components";
import withFooter from "./hoc/footerHoc";
import withTheme from "./hoc/themeHoc";
import { history } from "./redux/configureStore";
import { useActions } from "./redux/actions";
import * as GithubActions from "./redux/actions/github";
import * as AnalyticsActions from "./redux/actions/analytics";

const HomePage = lazy(() => import("./pages/HomePage"));

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
			</Switch>
		</div>
	);
}

function App() {
	const githubActions = useActions(GithubActions);
	const analyticsActions = useActions(AnalyticsActions);
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(true);
	useEffect(() => {
		console.log("HERERE");
		githubActions.loadStarCount();
		githubActions.loadContributors();
		analyticsActions.loadAnalytics();
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
