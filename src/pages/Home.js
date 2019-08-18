import * as React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';

import { HomeHeader } from '../components/HomeHeader';
import { ChartCard } from '../components/ChartCard';

import { IconContext } from "react-icons";
import { FaArrowUp, FaArrowDown, FaGripHorizontal } from 'react-icons/fa';

import { getChartList } from "../redux/selectors";

class Home extends React.Component {
  handleNavToChart = (id) => {
    this.props.history.push(`/charts/${id}`);
  }

  renderChartGrid = () => {
    return this.props.charts.map((chart) => {
      return <ChartCard
                circleColor="orange"
                navTo={this.handleNavToChart.bind(this, chart.id)}
                subChartCount="4"
                title={chart.metadata.annotations.vendor}
                provider={chart.spec.provider.name}
                text={chart.metadata.annotations.description}
                icon={`data:${chart.spec.icon[0].mediatype};base64, ${chart.spec.icon[0].base64data}`}
                id={chart.id}/>
    });
  }

  render() {
    return(
      <div class="home-container">
        <HomeHeader showHomeText={true}/>
        <div class="home-content">
          <div class="filter-container">
            <span class="filter-title-label">
              Chaos Type
            </span>
            <div class="checkbox-container">
              <input type="checkbox" />
              <span class="checkbox-label">Application chaos</span>
            </div>
            <div class="checkbox-container">
              <input type="checkbox" />
              <span class="checkbox-label">Network chaos</span>
            </div>
            <div class="checkbox-container">
              <input type="checkbox" />
              <span class="checkbox-label">Storage chaos</span>
            </div>
            <div class="checkbox-container">
              <input type="checkbox" />
              <span class="checkbox-label">Node chaos</span>
            </div>
            <div class="checkbox-container">
              <input type="checkbox" />
              <span class="checkbox-label">Kubernetes specific chaos</span>
            </div>

            <span class="filter-title-label">
              Provider
            </span>
            <div class="checkbox-container">
              <input type="checkbox" />
              <span class="checkbox-label">Mayadata</span>
            </div>
            <div class="checkbox-container">
              <input type="checkbox" />
              <span class="checkbox-label">Operatorhub</span>
            </div>
            <div class="checkbox-container">
              <input type="checkbox" />
              <span class="checkbox-label">Company-ABC</span>
            </div>
            <div class="checkbox-container">
              <input type="checkbox" />
              <span class="checkbox-label">Company-123</span>
            </div>
            <div class="checkbox-container">
              <input type="checkbox" />
              <span class="checkbox-label">Kubernetes specific chaos</span>
            </div>

            <span class="filter-title-label">
              Complexity
            </span>
            <div class="checkbox-container">
              <input type="checkbox" />
              <span class="checkbox-label">User - 1</span>
            </div>
            <div class="checkbox-container">
              <input type="checkbox" />
              <span class="checkbox-label">User - 2</span>
            </div>
            <div class="checkbox-container">
              <input type="checkbox" />
              <span class="checkbox-label">User - 3</span>
            </div>
          </div>

          <div class="chart-container">
            <div class="chart-filter-container">
              <span class="chart-count"><span class="bold-number">2</span> Items</span>
              <div class="chart-filter-controls-container">
                <IconContext.Provider value={{ 'margin-left': "15px", 'margin-right': "5px", size: '0.7em'}}>
                  <FaArrowUp />
                  <FaArrowDown />
                </IconContext.Provider>
                <span class="filter-control-label">
                  Sort
                </span>
                <IconContext.Provider value={{ 'margin-left': '15px', 'margin-right': '5px', size: '0.7em'}}>
                  <FaGripHorizontal />
                </IconContext.Provider>
                <span class="filter-control-label">
                  View
                </span>
              </div>
            </div>

            <div class="chart-grid">

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

const mapStateToProps = state => {
  return {
    charts: getChartList(state)
  }
};

export default withRouter(connect(mapStateToProps)(Home));
