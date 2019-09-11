import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import Home from './pages/Home';
import Chart from './pages/Chart';
import Subcharts from './pages/Subcharts';

class App extends React.Component {
  componentDidMount() {
    document.title = "Litmus charts";
  }
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/charts/:chartId" exact component={Chart} />
          <Route path="/" exact component={Home} />
          <Route path="/charts/:chartId/subcharts/:subchartID" component={Subcharts}/>
          <Redirect from="*" to="/" key="default-route" />
        </Switch>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(App);
