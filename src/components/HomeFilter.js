import * as React from 'react';
import connect from 'react-redux/es/connect/connect';

import { FaTimes } from 'react-icons/fa';

import { getFilters } from "../redux/selectors";
import { applyFilters } from "../redux/actions";
// import { thisExpression } from '@babel/types';

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
      <div className="checkbox-container" key={key} >
        <input type="checkbox" onClick={this.checkBoxClicked(prop, key)}/>
        <span className="checkbox-label">{key}</span>
      </div>))
  }
  handleFilterQueryExistenceCheck(key) {
    console.log(this.state.filter_state_info, 'filter');
    
    return this.state.filter_state_info.find(item=> key === item.name); 
  }

  checkBoxClicked = (type, key) => (evt) => {
    console.log('jello');
    
    let temp_category_container= this.props.filters; // => complexity=>[], provider=>[], type=>[] (filter_container)
    console.log(temp_category_container);
    
    for(let category in temp_category_container){
      let temp_filters_container = temp_category_container[category] // either complexity[] or provider[] or type[]
      console.log(temp_filters_container, 'temp_filters_container');
      
      for(let filter of temp_filters_container){
        if(filter === key){
        console.log(key,filter, 'inside temp_filters_container');
          console.log(this.handleFilterQueryExistenceCheck(key), 'return');
          
          if(!this.handleFilterQueryExistenceCheck(key)) {
            this.state.filter_state_info.push({name: key, annotation: category, state_value: true});
          }
          else {
            this.state.filter_state_info.map(item => key === item.name ? item.state_value ? item.state_value = false : item.state_value = true : '');
          }

          console.log(this.state.filter_state_info, 'I am your life saver')
        }
      }
    }
  this.props.applyFilters(this.state.filter_state_info);


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
          Contributor
        </span>
        {this.renderFilters('provider')}

        <span className="filter-title-label">
          Platforms
        </span>
        {this.renderFilters('platforms')}

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
