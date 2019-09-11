import * as React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter, Link } from 'react-router-dom';

import HomeHeader from '../components/HomeHeader';
import { ChartDetails } from '../components/ChartDetails';

import { IconContext } from "react-icons";
import { FaArrowLeft } from 'react-icons/fa';
// import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

import { getChartById } from "../redux/selectors";
import { loadChartById, loadCharts } from "../redux/actions";

class SubCharts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  componentDidMount() {
    this.props.loadChartById(this.props.match.params.chartId)
  }


  handleNavHome = () => {
    this.props.history.push(`/charts/${this.props.match.params.chartId}`);
  }

  renderCharts = () => {
    let i=0;
    let logo = this.props.chart.spec.icons[0].link;
    let displayName = this.props.chart.spec.displayName;
    let subchartName = this.props.match.params.subchartID
    let  subchart = this.props.chart.subCharts.filter(function(subchart) {    
      if(subchart.metadata.name == subchartName){
       return subchart;}
    });
   let  showsubchart = subchart.map(chart => <ChartDetails key={i++} charts={chart} displayName={displayName}  name={chart.spec.displayName} isCollapsed={false} logo={logo} />)
    return (
      [...showsubchart]
    )

  }

  render() {
    let icon = ""
    if(this.props.chart && this.props.chart.spec) {
      icon = this.props.chart.spec.icons[0].link
    }
    if(!this.props.chart.spec){
      return (
        <div></div>
      )
    }


    let subchartName = this.props.match.params.subchartID
    let subchart = this.props.chart.subCharts.filter(function(subchart) {    
      if(subchart.metadata.name == subchartName){
       return subchart;}
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
                <h3 className="chart-page-title">{subchart[0].spec.displayName}</h3>
              </div>
            </div>
            <div className="chart-page-header-breacrumbs-container">
              <div className="breadcrumbs">
                <Link to={`/charts/${this.props.chart.metadata.name}`}>Home/ {this.props.chart.spec.displayName}</Link> /{subchart[0].spec.displayName}
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


SubCharts.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubCharts));
