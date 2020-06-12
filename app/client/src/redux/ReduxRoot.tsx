import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "../App";
import configureStore from "./configureStore";
import { Loader } from "../components";

const { persistor, store } = configureStore();

export function ReduxRoot() {
	return (
		<Provider store={store}>
			<PersistGate loading={<Loader />} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	);
}
