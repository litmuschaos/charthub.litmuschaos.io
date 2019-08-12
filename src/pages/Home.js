import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom'

class Home extends React.Component {

    onHome = e => {
      e.preventDefault();
      this.props.history.push('/chart/1');
    };

    render() {
      return(
        <div>
        <div> Welcome to home page </div>
        <Link to="/charts/1">nav to chart page</Link>
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
