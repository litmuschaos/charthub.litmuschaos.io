import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom'

import { HomeHeader } from '../components/HomeHeader';

class Home extends React.Component {
    render() {
      return(
        <div class="home-container">
          <HomeHeader />
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
                <span class="chart-count"><bold>2</bold> items</span>
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

const mapStateToProps = state => ({
  ...state.operatorsState
});

export default withRouter(connect(mapStateToProps)(Home));
