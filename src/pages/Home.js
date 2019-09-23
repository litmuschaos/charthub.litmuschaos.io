import * as React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';

import HomeHeader from '../components/HomeHeader';
import HomeFilter from '../components/HomeFilter';
import { ChartCard } from '../components/ChartCard';

import { IconContext } from "react-icons";
import { FaList, FaArrowUp, FaArrowDown, FaFilter } from 'react-icons/fa';

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
      showFilters: !isMobile,
      isGridView: true, 
      sortDesc: true
      
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
      return <ChartCard
                isCard={this.state.isGridView}
                key={chart.metadata.name}
                circleColor="orange"
                navTo={this.handleNavToChart.bind(this, chart.metadata.name)}
                subChartCount={chart.subCharts ? chart.subCharts.length : 0}
                title={chart.spec.displayName}
                provider={chart.spec.provider.name}
                text={chart.metadata.annotations.description}
                icon={chart.spec.icons[0].link}
                id={chart.metadata.name}/>
    });
  }
  
  sortCharts = () => {
    
    this.setState({sortDesc : !this.state.sortDesc});
    // console.log(this.props.charts)
    if (this.state.sortDesc) {
      this.props.charts.sort((a,b)=> a.metadata.name.toUpperCase() > b.metadata.name.toUpperCase() ? -1 : b.metadata.name.toUpperCase() > a.metadata.name.toUpperCase() ? 1 : 0)
    } else {
      this.props.charts.sort((a,b)=> a.metadata.name.toUpperCase() < b.metadata.name.toUpperCase() ? -1 : b.metadata.name.toUpperCase() < a.metadata.name.toUpperCase() ? 1 : 0)
    }
  }
  switchView = () => {
    this.setState({ isGridView: this.state.isGridView ? false : true });
  }
  render() {
    let gridOrListIcon
    if(this.state.isGridView) {
      gridOrListIcon = <img alt="change view icon" src={process.env.PUBLIC_URL + '/icons/view_icon.svg'} width="15px" onClick={this.switchView}/>
    } else {
      gridOrListIcon = <FaList onClick={this.switchView}/>
    }
    // let assortedCharts 
    
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
              <span className="chart-count"><span className="bold-number">{this.props.charts.length}</span> primary chaos charts</span>
              <div className="chart-filter-controls-container" onClick={this.sortCharts.bind(this)}>
                <IconContext.Provider value={{ 'margin-left': "15px", 'margin-right': "5px", size: '0.8em'}}>
                  <FaArrowUp />
                  <FaArrowDown />
                </IconContext.Provider>
                <span className="filter-control-label" onClick = {this.sortCharts}>
                  Sort
                </span>
                {gridOrListIcon}
                <span className="filter-control-label" onClick={this.switchView}>
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
