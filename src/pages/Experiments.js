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

class Experiments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logo : "https://raw.githubusercontent.com/litmuschaos/chaos-charts/master/charts/"
    }
  }
  
  componentDidMount() {
    this.props.loadChartById(this.props.match.params.chartId)
  }

  handleNavHome = () => {
    this.props.history.push(`/charts/ ${this.props.match.params.chartId}`);
  }
 
  renderCharts = () => {
    let i=0;
    let displayName = this.props.chart.spec.displayName;
    let experimentName = this.props.match.params.experimentID;
    let experiment = this.props.chart.experiments.filter(function(experiment) {    
      if(experiment.metadata.name === experimentName){
       return experiment;}
    });

   let showexperiment = experiment.map(chart => 
   <ChartDetails 
   key={i++} 
   install_button_text="INSTALL EXPERIMENT" 
   charts={chart} 
   displayName={displayName}  
   name={chart.spec.displayName} 
   isCollapsed={false} 
   logo={this.state.logo + this.props.chart.metadata.name + "/icons/" + chart.metadata.name +".png"}  
   />)
    return (
      [...showexperiment]
    )

  }

  render() {
    let icon = ""
    if(this.props.chart && this.props.chart.spec) {
      icon = this.state.logo + this.props.chart.metadata.name + "/icons/" + this.props.chart.metadata.name +".png"
    }
    if(!this.props.chart.spec){
      return (
        <div></div>
      )
    }
    let experimentName = this.props.match.params.experimentID
    let experiment = this.props.chart.experiments.filter(function(experiment) {    
      if(experiment.metadata.name === experimentName){
       return experiment;}
    });
    return (
      <div className="chart-page-container">
        <HomeHeader
        showHomeText={false}
        icon={icon}
        title={this.props.chart.spec.displayName}
        />  
        <div className="chart-page-content">
          <div className="chart-page-header">
            <div className="chart-page-nav-back-container">
              <div className="nav-back-icon-container" onClick={this.handleNavHome}>
                  <IconContext.Provider value={{ color: "#004ED6", size: '0.7em'}}>
                      <FaArrowLeft />
                  </IconContext.Provider>
              </div>
              <div className="chart-page-title-container">
                <h3 className="chart-page-title">{experiment[0].spec.displayName}</h3>
              </div>
            </div>
            <div className="chart-page-header-breacrumbs-container">
              <div className="breadcrumbs">
                <Link to={`/charts/${this.props.chart.metadata.name}`}>Home / {this.props.chart.spec.displayName}</Link> / {experiment[0].spec.displayName}
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

Experiments.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Experiments));
