import * as React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { FaChevronDown } from 'react-icons/fa';
import { filterChartsOnSearch } from "../redux/actions";

class HomeHeader extends React.Component {
  constructor() {
    super()
    this.state = {
      searchTerm: ''
    }
  }
  renderHomeText = () => {
    if(this.props.showHomeText){
      return [
        <h1 key="1" className="home-header-title-1">Chaos Charts for Kubernetes</h1>,
        <h2 key="2" className="home-header-title-2">Hub for pre-defined chaos experiment for various applications running on Kubernetes and Kubernetes  </h2>,
        <h3 key="3" className="home-header-title-3">Browse, install, tune and run chaos using these charts. Contribute new charts.</h3>
      ]
    }
  }

  renderChartTitle = () => {
    if(!this.props.showHomeText){
      return (
        <div className="chart-header-title-container">
          <div className="chart-header-logo-container">
            <img alt="org logo" src={this.props.icon} height="30px"/>
          </div>
          <div className="chart-header-title">{this.props.title}</div>
        </div>
      )
    }
  }

  getHeaderHeight = () => {
    let height = '500px'
    if(!this.props.showHomeText) {
      height = '272.5px'
    }
    return {
      height
    }
  }

  heandleSearchTermChange = (evt) => {
    const searchTerm = evt.target.value
    this.setState({ searchTerm })
    this.props.filterChartsOnSearch(searchTerm)
  }
  render() {
    return (
      <div className="home-header-container" style={this.getHeaderHeight()}>
        <div className="top-header-container">
          <Link to={'/'}>
            <div className="top-header-divide-container">
              <img alt="organization logo" src={process.env.PUBLIC_URL + '/icons/litmus.png'} className="logo-img"/>
              <h3 className="page-title">Litmus</h3>
            </div>
          </Link>
          <input className="top-header-input" placeholder="Search for charts..." value={this.state.searchTerm} onChange={this.heandleSearchTermChange} />
          <a href = "https://github.com/litmuschaos/community-charts/blob/master/CONTRIBUTING.md" target = "_blank">
          <h3 className="top-header-contribute">Contribute<span className="contribute-icon-container">{/*<FaChevronDown />*/}</span></h3>
          </a>
          <a href = "https://docs.litmuschaos.io/" target = "_blank">
          <h3 className="top-header-contribute">Docs<span className="contribute-icon-container"></span></h3>
          </a>
        </div>
        {this.renderHomeText()}
        {this.renderChartTitle()}
      </div>
    )
  }
}

const mapDispatchToProps = {
  filterChartsOnSearch
};

export default connect(null, mapDispatchToProps)(HomeHeader);
