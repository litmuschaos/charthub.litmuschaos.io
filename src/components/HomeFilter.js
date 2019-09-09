import * as React from 'react';
import connect from 'react-redux/es/connect/connect';

import { FaTimes } from 'react-icons/fa';

import { getFilters } from "../redux/selectors";
import { applyFilters } from "../redux/actions";

class HomeFilter extends React.Component {
  hideShowFilters = () => {
    if(this.props.show === true) {
      return {
        display: 'block'
      }
    } else {
      return {
        display: 'none'
      }
    }
  }

  renderFilters = (prop) => {
    console.log('renders');
    return this.props.filters[prop].map(key => (
      <div className="checkbox-container" key={key}>
        <input type="checkbox" onChange={this.checkBoxClicked(prop)} disabled/>
        <span className="checkbox-label">{key}</span>
      </div>))
  }

  checkBoxClicked = type => (evt) => {
    console.log(type);
    console.log(this.props.filters);
  }

  render() {
    return (
      <div className="filter-container" style={this.hideShowFilters()}>
        <span className="phone-filter-close" onClick={this.props.showHide}>
          <FaTimes /> Filters
        </span>
        <span className="filter-title-label" id="first-title" >
          Chaos Type
        </span>
        {this.renderFilters('type')}

        <span className="filter-title-label">
          Provider
        </span>
        {this.renderFilters('provider')}

        {/* <span className="filter-title-label">
          Complexity
        </span>
        {this.renderFilters('complexity')}  */}
      </div>
    )
  }
}

const mapDispatchToProps = {
  applyFilters
}

const mapStateToProps = (state, ownProps) => {
  return {
    filters: getFilters(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeFilter)
