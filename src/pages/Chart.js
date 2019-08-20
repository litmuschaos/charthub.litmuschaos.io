import * as React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter, Link } from 'react-router-dom';

import { HomeHeader } from '../components/HomeHeader';
import { ChartDetails } from '../components/ChartDetails';

import { IconContext } from "react-icons";
import { FaArrowLeft, FaArrowUp, FaArrowDown } from 'react-icons/fa';

import { getChartById } from "../redux/selectors";

class Chart extends React.Component {
  renderChartAndSubCharts = () => {

  }
  handleNavHome = () => {
    this.props.history.push('/');
  }
  render() {
    return (
      <div className="chart-page-container">
        <HomeHeader
          title={this.props.chart.spec.displayName}
          showHomeText={false}
          icon={`data:${this.props.chart.spec.icon[0].mediatype};base64, ${this.props.chart.spec.icon[0].base64data}`}/>

        <div className="chart-page-content">
          <div className="chart-page-header">

            <div className="chart-page-nav-back-container">
              <div className="nav-back-icon-container" onClick={this.handleNavHome}>
                  <IconContext.Provider value={{ color: "#004ED6", size: '0.7em'}}>
                      <FaArrowLeft />
                  </IconContext.Provider>
              </div>
              <div className="chart-page-title-container">
                <h3 className="chart-page-title">{this.props.chart.spec.displayName}</h3>
              </div>
            </div>

            <div className="chart-page-header-breacrumbs-container">
              <div className="breadcrumbs">
                <Link to={'/'}>Home</Link> / {this.props.chart.spec.displayName}
              </div>
              <div className="chart-header-filters-container">
                <div className="header-filter">
                  <IconContext.Provider value={{ 'margin-left': "15px", 'margin-right': "5px", size: '0.7em'}}>
                    <FaArrowUp />
                    <FaArrowDown />
                  </IconContext.Provider>
                  <span className="header-filter-label">Sort</span>
                </div>
                <div className="header-filter">
                  <img src={process.env.PUBLIC_URL + '/icons/view_icon.svg'} width="15px" alt="change view icon"/>
                  <span className="header-filter-label">View</span>
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
  return {
    chart
  }
};

export default withRouter(connect(mapStateToProps)(Chart));
