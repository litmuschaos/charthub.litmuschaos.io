import * as React from 'react';
import connect from 'react-redux/es/connect/connect';

import { FaTimes } from 'react-icons/fa';

import { getFilters } from "../redux/selectors";
import { applyFilters } from "../redux/actions";

class HomeFilter extends React.Component {
  
  constructor() {
    super() 
    this.state = {
       filter_state_info : []      
    }
  }
 
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
    return this.props.filters[prop].map(key => (
      <div className="checkbox-container" key={key} worker={this.state.filter_state_info.push({name: key, annotation: prop, state_value: false})}>
        <input type="checkbox" onChange={this.checkBoxClicked(prop, key)}/>
        <span className="checkbox-label">{key}</span>
      </div>))
  }

  checkBoxClicked = (type, key) => (evt) => {
    
    // console.log(type);
    // console.log(key);
    const temp_filter_state_info = this.state.filter_state_info;
    var index = -1 ;

    temp_filter_state_info.map(item => {
      index = index + 1;
      if(item.annotation === type && item.name === key) {
        temp_filter_state_info[index].state_value = !temp_filter_state_info[index].state_value;
      }
      
    })
    this.state.filter_state_info = temp_filter_state_info;
    console.log(this.state.filter_state_info);
    this.props.applyFilters(temp_filter_state_info);


  }

  render() {
    return (
      <div className="filter-container" style={this.hideShowFilters()}>
        <span className="phone-filter-close" onClick={this.props.showHide}>
          <FaTimes /> Filters
        </span>
        <span className="filter-title-label" id="first-title" >
          Chaos For
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
