import React from "react";
import { Route } from "react-router";

export default (
	<Route>
		<Route path="/" />
		<Route path="/404" />
		<Route path="/:chartGroupId/:chartId" />
	</Route>
);
