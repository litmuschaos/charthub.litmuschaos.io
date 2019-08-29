import * as React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';

import { HomeHeader } from '../components/HomeHeader';
import { HomeFilter } from '../components/HomeFilter';
import { ChartCard } from '../components/ChartCard';

import { IconContext } from "react-icons";
import { FaArrowUp, FaArrowDown, FaFilter } from 'react-icons/fa';

import { getChartList } from "../redux/selectors";
import { loadCharts } from "../redux/actions";
class Home extends React.Component {
  constructor() {
    super();
    let isMobile = false
    if(window.innerWidth < 768) {
      isMobile = true
    }
    this.state = {
      showFilters: !isMobile
    }
  }
  componentDidMount() {
    this.props.loadCharts()
  }
  handleNavToChart = (chartName) => {
    this.props.history.push(`/charts/${chartName}`);
  }

  showHideFilters = () => {
    if(this.state.showFilters) {
      this.setState({ showFilters: false });
    } else {
      this.setState({ showFilters: true });
    }
  }

  renderChartGrid = () => {
    return this.props.charts.map((chart) => {
      let icon = ''
      if(chart.spec.icon && chart.spec.icon[0]){
        icon = `data:${chart.spec.icon[0].mediatype};base64, ${chart.spec.icon[0].base64data}`
      }
      return <ChartCard
                key={chart.metadata.name}
                circleColor="orange"
                navTo={this.handleNavToChart.bind(this, chart.metadata.name)}
                subChartCount="4"
                title={chart.metadata.name}
                provider={chart.spec.provider.name}
                text={chart.metadata.annotations.description}
                icon={icon}
                id={chart.metadata.name}/>
    });
  }

  sortCharts = () => {
    if(this.props.sortAsc) {
      this.setState({ sort: { sortAsc: false } });
    } else {
      this.setState({ sort: { sortAsc: true } });
    }

  }

  render() {
    return(
      <div className="home-container">
        <HomeHeader showHomeText={true}/>
        <div className="home-content">
        <HomeFilter show={this.state.showFilters} showHide={this.showHideFilters.bind(this)}/>
          <div className="chart-container">
            <div className="phone-filter-button-container" onClick={this.showHideFilters}>
              <FaFilter />
              Filters
            </div>

            <div className="chart-filter-container">
              <span className="chart-count"><span className="bold-number">2</span> Items</span>
              <div className="chart-filter-controls-container" onClick={this.sortCharts.bind(this)}>
                <IconContext.Provider value={{ 'margin-left': "15px", 'margin-right': "5px", size: '0.8em'}}>
                  <FaArrowUp />
                  <FaArrowDown />
                </IconContext.Provider>
                <span className="filter-control-label">
                  Sort
                </span>
                <img alt="change view icon" src={process.env.PUBLIC_URL + '/icons/view_icon.svg'} width="15px"/>
                <span className="filter-control-label">
                  View
                </span>
              </div>
            </div>

            <div className="chart-grid">

              {this.renderChartGrid()}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapDispatchToProps = {
  loadCharts
};

const mapStateToProps = (state, ownProps) => {
  const sort = {
    isAsc: false
  }
  return {
    charts: getChartList(state, sort),
    sort
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
