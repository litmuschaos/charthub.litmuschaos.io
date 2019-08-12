import * as React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'


class Chart extends React.Component {
  render() {
    return (
      <div>
      <div> Welcome to chart page </div>
      <Link to="/">nav to home page</Link>
      </div>
    );
  }
}


Chart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  ...state.operatorsState
});

export default withRouter(connect(mapStateToProps)(Chart));
