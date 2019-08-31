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
import { loadChartById } from "../redux/actions";

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.loadChartById(this.props.match.params.chartId)
  }
  renderChartAndSubCharts = () => {

  }
  handleNavHome = () => {
    this.props.history.push('/');
  }

  renderCharts = () => {
    const subCharts = this.props.chart.subCharts.map(chart => <ChartDetails name={chart.spec.displayName} isCollapsed={true}/>)
    return (
      [<ChartDetails name={this.props.chart.spec.displayName} isCollapsed={false} />, ...subCharts]
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

    //children of div with class called chart-header-filters-container if needed in the future
    // <div className="header-filter">
    //   <IconContext.Provider value={{ 'margin-left': "15px", 'margin-right': "5px", size: '0.7em'}}>
    //     <FaArrowUp />
    //     <FaArrowDown />
    //   </IconContext.Provider>
    //   <span className="header-filter-label">Sort</span>
    // </div>
    // <div className="header-filter">
    //   <img src={process.env.PUBLIC_URL + '/icons/view_icon.svg'} width="15px" alt="change view icon"/>
    //   <span className="header-filter-label">View</span>
    // </div>

    return (
      <div className="chart-page-container">
        <HomeHeader
          title={this.props.chart.spec.displayName}
          showHomeText={false}
          icon={icon}/>

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
