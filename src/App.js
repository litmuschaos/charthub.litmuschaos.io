import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import Home from './pages/Home';
import Chart from './pages/Chart';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/chart:chartId" component={Chart} />
          <Route path="/" component={Home} />
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
