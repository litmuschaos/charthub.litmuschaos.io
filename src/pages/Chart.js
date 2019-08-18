import * as React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter, Link } from 'react-router-dom';

import { HomeHeader } from '../components/HomeHeader';
import { ChartDetails } from '../components/ChartDetails';

import { IconContext } from "react-icons";
import { FaArrowLeft, FaArrowUp, FaArrowDown, FaGripHorizontal } from 'react-icons/fa';

import { getChartById } from "../redux/selectors";

class Chart extends React.Component {

  render() {
    return (
      <div class="chart-page-container">
        <HomeHeader
          title={this.props.chart.spec.displayName}
          showHomeText={false}
          icon={`data:${this.props.chart.spec.icon[0].mediatype};base64, ${this.props.chart.spec.icon[0].base64data}`}/>

        <div class="chart-page-content">
          <div class="chart-page-header">

            <div class="chart-page-nav-back-container">
              <div class="nav-back-icon-container">
                <Link to={'/'}>
                  <IconContext.Provider value={{ color: "#004ED6", size: '0.7em'}}>
                      <FaArrowLeft />
                  </IconContext.Provider>
                </Link>
              </div>
              <div class="chart-page-title-container">
                <h3 class="chart-page-title">{this.props.chart.spec.displayName}</h3>
              </div>
            </div>

            <div class="chart-page-header-breacrumbs-container">
              <div class="breadcrumbs">
                <Link to={'/'}>Home</Link> / {this.props.chart.spec.displayName}
              </div>
              <div class="chart-header-filters-container">
                <div class="header-filter">
                  <IconContext.Provider value={{ 'margin-left': "15px", 'margin-right': "5px", size: '0.7em'}}>
                    <FaArrowUp />
                    <FaArrowDown />
                  </IconContext.Provider>
                  <span class="header-filter-label">Sort</span>
                </div>
                <div class="header-filter">
                  <IconContext.Provider value={{ 'margin-left': '15px', 'margin-right': '5px', size: '0.7em'}}>
                    <FaGripHorizontal />
                  </IconContext.Provider>
                  <span class="header-filter-label">View</span>
                </div>
              </div>
            </div>
          </div>

          <ChartDetails isCollapsed={false}/>
          <ChartDetails isCollapsed={true}/>

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

const mapStateToProps = (state, ownProps) => {
  const { chartId } = ownProps.match.params;
  const chart = getChartById(state, chartId);
  console.log('chart', chart);
  return {
    chart
  }
};

export default withRouter(connect(mapStateToProps)(Chart));
