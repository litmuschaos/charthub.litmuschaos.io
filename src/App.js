import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Home from "./pages/Home";
import Chart from "./pages/Chart";
import Experiments from "./pages/Experiments";

class App extends React.Component {
  componentDidMount() {
    document.title = "Chaos Engineering - Litmus charts for Kubernetes";
  }
  render() {
    return (
      <div
        className={`${this.props.isDarkTheme ? "theme-dark" : "theme-light"}`}
      >
        <div className="app">
          <Switch>
            <Route path="/charts/:chartId" exact component={Chart} />
            <Route path="/" exact component={Home} />
            <Route
              path="/charts/:chartId/experiments/:experimentID"
              component={Experiments}
            />
            <Redirect from="*" to="/" key="default-route" />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isDarkTheme: state.theme.isDarkTheme,
});

export default withRouter(connect(mapStateToProps)(App));
