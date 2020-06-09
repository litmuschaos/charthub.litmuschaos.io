import React, { lazy, Suspense } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { useStyles } from "./App-styles";
import { AppDrawer, Loader } from "./components";
import withFooter from "./hoc/footerHoc";
import withTheme from "./hoc/themeHoc";
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
	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = React.useState(true);

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
