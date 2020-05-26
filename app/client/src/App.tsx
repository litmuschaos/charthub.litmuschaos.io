import React, { lazy, Suspense } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { useStyles } from "./App-styles";
import { AppDrawer, Header, Loader } from "./components";
import { history } from "./redux/configureStore";
import { withTheme } from "./withTheme";

const HomePage = lazy(() => import("./pages/HomePage"));
const TodoPage = lazy(() => import("./pages/TodoPage"));

function Routes() {
	const classes = useStyles();

	return (
		<div className={classes.content}>
			<Switch>
				<Route exact={true} path="/" component={HomePage} />
				<Route exact={true} path="/home" component={HomePage} />
				<Route exact={true} path="/todo" component={TodoPage} />
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
						<Header handleDrawerToggle={handleDrawerToggle} />
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
