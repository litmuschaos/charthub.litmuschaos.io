import * as React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';

import HomeHeader from '../components/HomeHeader';
import HomeFilter from '../components/HomeFilter';
import Footer from '../components/Footer';
import { ChartCard } from '../components/ChartCard';

import { IconContext } from 'react-icons';
import { FaList, FaArrowUp, FaArrowDown, FaFilter } from 'react-icons/fa';

import { getChartList } from '../redux/selectors';
import { loadCharts, analyticsData, githubData } from '../redux/actions';
import { standardizeMetrics } from '../common/addMetrics.js';
class Home extends React.Component {
  constructor() {
    super();
    let isMobile = false;
    if (window.innerWidth < 768) {
      isMobile = true;
    }
    this.state = {
      showFilters: !isMobile,
      isGridView: true,
      sortDesc: true,
      expTotal: 0
    };
  }
  componentDidMount() {
    this.props.loadCharts();
    this.props.analyticsData();
    this.props.githubData();
  }
  handleNavToChart = chartName => {
    try {
      this.props.history.push(`/charts/${chartName}`);
    } catch (e) {
      console.log('Catch error:', e);
    }
  };

  showHideFilters = () => {
    if (this.state.showFilters) {
      this.setState({ showFilters: false });
    } else {
      this.setState({ showFilters: true });
    }
  };
  storeTotalExperiments = charts => {
    try {
      var totalExpCount = 0;
      if (charts.length > 0) {
        charts.forEach(element => {
          if (element.experiments != null) {
            totalExpCount = totalExpCount + element.experiments.length;
          }
        });
      }
      return totalExpCount;
    } catch (e) {
      console.log('Catch error:', e);
    }
  };
  operatorMetrics = () => {
    try {
      var result = this.props.analytics.filter(
        exp => exp.Label === 'Chaos-Operator'
      );
      var metrics = result.length ? result[0].Count : 0;
      return standardizeMetrics(parseInt(metrics, 10));
    } catch (e) {
      console.log('Catch error:', e);
    }
  };
  /*---> TODO : Refactor this func*/
  totalChartExpCount = chart => {
    try {
      let parentChartCount = 0;
      let analytics = this.props.analytics;

      let exp = chart.experiments;
      if (exp !== null && this.props.analytics.length !== 0) {
        for (let i = 0; i < exp.length; i++) {
          let matchingExperiment = exp[i].metadata.name;
          for (let i = 0; i < analytics.length; i++) {
            let matchingEvent = analytics[i];
            if (matchingExperiment === matchingEvent.Label)
              parentChartCount =
                parentChartCount + parseInt(matchingEvent.Count);
          }
        }
      }
      return standardizeMetrics(parseInt(parentChartCount, 10));
    } catch (e) {
      console.log('Catch error:', e);
    }
  };
  renderChartGrid = () => {
    try {
      return this.props.charts.map(chart => {
        let logo = 'https://raw.githubusercontent.com/litmuschaos/chaos-charts/staging/charts/' +
        chart.metadata.name +
        '/icons/';
        return (
          <ChartCard
            isCard={this.state.isGridView}
            key={chart.metadata.name}
            circleColor='orange'
            navTo={this.handleNavToChart.bind(this, chart.metadata.name)}
            experimentCount={chart.experiments ? chart.experiments.length : 0}
            title={chart.spec.displayName}
            provider={chart.spec.provider.name}
            Platforms={chart.spec.platforms}
            text={chart.metadata.annotations.chartDescription}
            icon={logo + chart.metadata.name + '.png'}
            id={chart.metadata.name}
            analytics={this.props.analytics}
            totalChartExpCount={this.totalChartExpCount(chart)}
          />
        );
      });
    } catch (e) {
      console.log('Catch error:', e);
    }
  };

  sortCharts = () => {
    try {
      this.setState({ sortDesc: !this.state.sortDesc });
      if (this.state.sortDesc) {
        this.props.charts.sort((a, b) =>
          a.metadata.name.toUpperCase() > b.metadata.name.toUpperCase()
            ? -1
            : b.metadata.name.toUpperCase() > a.metadata.name.toUpperCase()
              ? 1
              : 0
        );
      } else {
        this.props.charts.sort((a, b) =>
          a.metadata.name.toUpperCase() < b.metadata.name.toUpperCase()
            ? -1
            : b.metadata.name.toUpperCase() < a.metadata.name.toUpperCase()
              ? 1
              : 0
        );
      }
    } catch (e) {
      console.log('Catch error:', e);
    }
  };
  switchView = () => {
    try {
      this.setState({ isGridView: this.state.isGridView ? false : true });
    } catch (e) {
      console.log('Catch error:', e);
    }
  };

  render() {
    try {
      let gridOrListIcon;
      if (this.state.isGridView) {
        gridOrListIcon = (
          <img
            alt='change view icon'
            src={process.env.PUBLIC_URL + '/icons/view_icon.svg'}
            width='15px'
            onClick={this.switchView}
          />
        );
      } else {
        gridOrListIcon = <FaList onClick={this.switchView} />;
      }

      return (
        <div className='home-container'>
          <HomeHeader showHomeText={true} />
          <div className='home-content'>
            <HomeFilter
              show={this.state.showFilters}
              showHide={this.showHideFilters.bind(this)}
            />
            <div className='chart-container'>
              <div
                className='phone-filter-button-container'
                onClick={this.showHideFilters}
              >
                <FaFilter />
                Filters
              </div>

              <div className='chart-filter-container'>
                <span className='chart-count'>
                  <span className='bold-number'>
                    {this.props.charts.length}
                  </span>{' '}
                  primary chaos charts
                </span>
                <div
                  className='chart-filter-controls-container'
                  onClick={this.sortCharts.bind(this)}
                >
                  <IconContext.Provider
                    value={{
                      'margin-left': '15px',
                      'margin-right': '5px',
                      size: '0.8em'
                    }}
                  >
                    <FaArrowUp />
                    <FaArrowDown />
                  </IconContext.Provider>
                  <span
                    className='filter-control-label'
                    onClick={this.sortCharts}
                  >
                    Sort
                  </span>
                  {gridOrListIcon}
                  <span
                    className='filter-control-label'
                    onClick={this.switchView}
                  >
                    View
                  </span>
                </div>
              </div>
              <div className='chart-grid'>{this.renderChartGrid()}</div>
            </div>
          </div>
          <div className='footer-content'>
            <Footer
              totalExperiments={this.storeTotalExperiments(this.props.charts)}
              operatorMetrics={this.operatorMetrics()}
              totalExperimentsRun={
                this.props.analytics.length
                  ? standardizeMetrics(
                    parseInt(
                      this.props.analytics[this.props.analytics.length - 1]
                        .Count
                    )
                  )
                  : '0'
              }
              githubStars={
                this.props.githubjson !== undefined
                  ? standardizeMetrics(
                    parseInt(this.props.githubjson.stargazers_count, 10)
                  )
                  : ''
              }
            />
          </div>
        </div>
      );
    } catch (e) {
      console.log('Catch error:', e);
    }
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = (state, ownProps) => {
  try {
    const sort = {
      isAsc: false
    };
    return {
      charts: getChartList(state, sort),
      sort,
      analytics: state.charts.analytics,
      githubjson: state.charts.githubdata
    };
  } catch (e) {
    console.log('Catch error:', e);
  }
};
const mapDispatchToProps = {
  loadCharts,
  analyticsData,
  githubData
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
