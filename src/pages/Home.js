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

class Home extends React.Component {
  handleNavToChart = (chartName) => {
    this.props.history.push(`/charts/${chartName}`);
  }

  renderChartGrid = () => {
    return this.props.charts.map((chart) => {
      return <ChartCard
                key={chart.id}
                circleColor="orange"
                navTo={this.handleNavToChart.bind(this, chart.metadata.annotations.vendor)}
                subChartCount="4"
                title={chart.metadata.annotations.vendor}
                provider={chart.spec.provider.name}
                text={chart.metadata.annotations.description}
                icon={`data:${chart.spec.icon[0].mediatype};base64, ${chart.spec.icon[0].base64data}`}
                id={chart.id}/>
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
        <HomeFilter />
          <div className="chart-container">
            <div className="phone-filter-button-container">
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

const mapStateToProps = (state, ownProps) => {
  const sort = {
    isAsc: false
  }
  return {
    charts: getChartList(state, sort),
    sort
  }
};

export default withRouter(connect(mapStateToProps)(Home));
