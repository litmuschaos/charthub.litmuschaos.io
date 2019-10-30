import * as React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter, Link } from 'react-router-dom';

import HomeHeader from '../components/HomeHeader';
import { ChartDetails } from '../components/ChartDetails';

import { IconContext } from "react-icons";
import { FaArrowLeft } from 'react-icons/fa';


import { getChartById } from "../redux/selectors";
import { loadChartById } from "../redux/actions";

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logo : "https://raw.githubusercontent.com/litmuschaos/chaos-charts/master/charts/"
    }
  }
  componentDidMount() {
    this.props.loadChartById(this.props.match.params.chartId)
  }
 
  renderCharts = () => {
    let i = 0;
    
    let displayName = this.props.chart.spec.displayName;
    return (
      <div>
      <ChartDetails 
      key={i++} 
      install_button_text="INSTALL ALL EXPERIMENTS" 
      istory = {this.props.history}
      charts={this.props.chart} 
      displayName={displayName} 
      name={this.props.chart.spec.displayName} 
      isCollapsed={false} 
      logo={this.state.logo + this.props.chart.metadata.name + "/icons/" + this.props.chart.metadata.name +".png"}  />
     
      </div> 
    )
  }
  handleNavHome = () => {
    this.props.history.push(`/`);
  }

  render() {
    let icon = ""
    if (this.props.chart && this.props.chart.spec) {
    
      icon = this.state.logo + this.props.chart.metadata.name +".png"
    }
    if (!this.props.chart.spec) {
      return (
        <div></div>
      )
    }

    return (
      <div className="chart-page-container">
        <HomeHeader
          title={this.props.chart.spec.displayName}
          showHomeText={false}
          icon={this.state.logo + this.props.chart.metadata.name + "/icons/" + this.props.chart.metadata.name +".png"} />

        <div className="chart-page-content">
          <div className="chart-page-header">

            <div className="chart-page-nav-back-container">
              <div className="nav-back-icon-container" onClick={this.handleNavHome}>
                <IconContext.Provider value={{ color: "#004ED6", size: '0.7em' }}>
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

              </div>
            </div>
          </div>
          {this.renderCharts()}
          
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
  return {
    chart: getChartById(state, ownProps.match.params.chartId)
  }
};

const mapDispatchToProps = {
  loadChartById
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chart));
