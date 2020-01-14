import * as React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter, Link } from 'react-router-dom';

import HomeHeader from '../components/HomeHeader';
import { ChartDetails } from '../components/ChartDetails';

import { IconContext } from "react-icons";
import { FaArrowLeft } from 'react-icons/fa';


import { getChartById } from "../redux/selectors";
import { loadChartById, analyticsData } from "../redux/actions";

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logo : "https://raw.githubusercontent.com/litmuschaos/chaos-charts/master/charts/"
    }
  }
  componentDidMount() {
    this.props.loadChartById(this.props.match.params.chartId)
    this.props.analyticsData();
  }
  /*---> TODO : Refactor this func*/
  func = (chart) => {
    let parentChartCount = 0;
    let analytics = this.props.analytics;
    let exp = this.props.chart.experiments
    if (this.props.analytics.length != 0) {
      for (let i = 0; i < exp.length;i++) {
        let matchingExperiment = exp[i].metadata.name
        for (let i = 0; i< analytics.length;i++) {
          let matchingEvent = analytics[i]
          if(matchingExperiment == matchingEvent.Label)
            parentChartCount = parentChartCount + parseInt(matchingEvent.Count)
        }
      }
    }
    return parentChartCount
}
  renderCharts = () => {
    let i = 0;
    let displayName = this.props.chart.spec.displayName;
    return (
      <div>
      <ChartDetails 
      key={i++} 
      install_button_text="INSTALL ALL EXPERIMENTS" 
      history = {this.props.history}
      charts={this.props.chart} 
      CountMessage="Total experiments run count"
      ChartCount={this.func()}
      analytics={this.props.analytics}
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
                <Link to={'/'}><span className="breadcrumb-text">Home</span></Link> > <span className="breadcrumb-text">{this.props.chart.spec.displayName}</span>
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
    chart: getChartById(state, ownProps.match.params.chartId),
    analytics: state.charts.analytics
  }
};

const mapDispatchToProps = {
  loadChartById,
  analyticsData
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chart));
