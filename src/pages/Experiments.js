import * as React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter, Link } from 'react-router-dom';

import HomeHeader from '../components/HomeHeader';
import ChartDetails from '../components/ChartDetails';

import { IconContext } from 'react-icons';
import { FaArrowLeft } from 'react-icons/fa';

import { getChartById } from '../redux/selectors';
import { standardizeMetrics } from '../common/addMetrics';
import { loadChartById, analyticsData } from '../redux/actions';
import { getVersion } from "../common/helpers"

class Experiments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logo:
        'https://raw.githubusercontent.com/litmuschaos/chaos-charts/master/charts/'
    };
  }

  componentDidMount() {
    try {
      const chartVersion = getVersion(this.props.versions)
      this.props.loadChartById(chartVersion,this.props.match.params.chartId);
      this.props.analyticsData();
    } catch (e) {
      console.log('Catch error:', e);
    }
  }

  handleNavHome = () => {
    try {
      this.props.history.push(`/charts/${this.props.match.params.chartId}`);
    } catch (e) {
      console.log('Catch error:', e);
    }
  };

  func = chart => {
    try {
      let count = this.props.analytics.filter(
        exp => exp.Label === chart.spec.displayName
      )[0];
      return count !== undefined
        ? standardizeMetrics(parseInt(count.Count, 10))
        : '0';
    } catch (e) {
      console.log('Catch error:', e);
    }
  };

  filterExperiment = experimentName => {
    let exp = this.props.chart.experiments.filter(experiment => {
      if (experiment.metadata.name === experimentName) {
        return experiment;
      }
      return null;
    });
    return exp[0];
  }

  renderCharts = () => {
    try {
      let i = 0;
      let videoLink = ""
      let displayName = this.props.chart.spec.displayName;
      let experimentName = this.props.match.params.experimentID;

      // Returns only the specific matching experiment json object or undefined
      let experiment = this.filterExperiment(experimentName);

      let links = experiment.spec.links?experiment.spec.links:[]
      links.forEach(link=>{
        if(link.name.toLowerCase()==="video")
          videoLink=link.url;
      })

      let showexperiment = experiment?
        <ChartDetails
          key={i++}
          install_button_text='INSTALL EXPERIMENT'
          charts={experiment}
          analytics={this.props.analytics}
          CountMessage='Total runs'
          ChartCount={this.func(experiment)}
          displayName={displayName}
          name={experiment.spec.displayName}
          isCollapsed={false}
          video={videoLink}
          logo={
            this.state.logo +
            this.props.chart.metadata.name +
            '/icons/' +
            experiment.metadata.name +
            '.png'
          }
        />:"";
      return [showexperiment];
    } catch (e) {
      console.log('Catch error:', e);
    }
  };

  render() {
    try {
      let icon = '';
      if (this.props.chart && this.props.chart.spec) {
        icon =
          this.state.logo +
          this.props.chart.metadata.name +
          '/icons/' +
          this.props.chart.metadata.name +
          '.png';
      }
      if (!this.props.chart.spec) {
        return <div></div>;
      }
      let experimentName = this.props.match.params.experimentID;
      let experiment = this.filterExperiment(experimentName);

      return (
        <div className='chart-page-container'>
          <HomeHeader
            showHomeText={false}
            icon={icon}
            title={this.props.chart.spec.displayName}
          />
          <div className='chart-page-content'>
            <div className='chart-page-header'>
              <div className='chart-page-nav-back-container'>
                <div
                  className='nav-back-icon-container'
                  onClick={this.handleNavHome}
                >
                  <IconContext.Provider
                    value={{ color: '#004ED6', size: '0.7em' }}
                  >
                    <FaArrowLeft />
                  </IconContext.Provider>
                </div>
                <div className='chart-page-title-container'>
                  <h3 className='chart-page-title'>
                    {experiment.spec.displayName}
                  </h3>
                </div>
              </div>
              <div className='chart-page-header-breacrumbs-container'>
                <div className='breadcrumbs'>
                  <Link to={`/charts/${this.props.chart.metadata.name}`}>
                    <span className='breadcrumb-text'>Home </span> >{' '}
                    <span className='breadcrumb-text'>
                      {this.props.chart.spec.displayName}
                    </span>
                  </Link>{' '}
                  >{' '}
                  <span className='breadcrumb-text'>
                    {experiment.spec.displayName}
                  </span>
                </div>
                <div className='chart-header-filters-container'></div>
              </div>
            </div>
            {this.renderCharts()}
          </div>
        </div>
      );
    } catch (e) {
      console.log('Catch error:', e);
    }
  }
}

Experiments.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = (state, ownProps) => {
  try {
    return {
      chart: getChartById(state, ownProps.match.params.chartId),
      analytics: state.charts.analytics
    };
  } catch (e) {
    console.log('Catch error:', e);
  }
};

const mapDispatchToProps = {
  loadChartById,
  analyticsData
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Experiments)
);