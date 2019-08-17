import * as React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';

import { HomeHeader } from '../components/HomeHeader';
import { ChartDetails } from '../components/ChartDetails';

class Chart extends React.Component {
  render() {
    return (
      <div class="chart-page-container">
        <HomeHeader showHomeText={false}/>
        <div class="chart-page-content">
          <div class="chart-page-header">

          </div>
          
          <ChartDetails />
          <ChartDetails />

        </div>
      </div>
    );
  }
}


Chart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  ...state.operatorsState
});

export default withRouter(connect(mapStateToProps)(Chart));
