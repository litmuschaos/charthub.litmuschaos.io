import * as React from 'react';

import { FaTimes } from 'react-icons/fa';

export class HomeFilter extends React.Component {
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
  render() {
    return (
      <div className="filter-container" style={this.hideShowFilters()}>
        <span className="phone-filter-close" onClick={this.props.showHide}>
          <FaTimes /> Filters
        </span>
        <span className="filter-title-label" id="first-title">
          Chaos Type
        </span>
        <div className="checkbox-container">
          <input type="checkbox" />
          <span className="checkbox-label">Application chaos</span>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" />
          <span className="checkbox-label">Network chaos</span>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" />
          <span className="checkbox-label">Storage chaos</span>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" />
          <span className="checkbox-label">Node chaos</span>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" />
          <span className="checkbox-label">Kubernetes specific chaos</span>
        </div>

        <span className="filter-title-label">
          Provider
        </span>
        <div className="checkbox-container">
          <input type="checkbox" />
          <span className="checkbox-label">Mayadata</span>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" />
          <span className="checkbox-label">Operatorhub</span>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" />
          <span className="checkbox-label">Company-ABC</span>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" />
          <span className="checkbox-label">Company-123</span>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" />
          <span className="checkbox-label">Kubernetes specific chaos</span>
        </div>

        <span className="filter-title-label">
          Complexity
        </span>
        <div className="checkbox-container">
          <input type="checkbox" />
          <span className="checkbox-label">User - 1</span>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" />
          <span className="checkbox-label">User - 2</span>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" />
          <span className="checkbox-label">User - 3</span>
        </div>
      </div>
    )
  }
}
