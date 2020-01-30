import React, { Component } from 'react'
import Modal from 'react-modal';
import classNames from 'classnames';
import { InstallModalContent } from '../components/InstallModalContent';
import { EngineViewerModalContent } from '../components/EngineViewerModalContent';
import { ChartCard } from '../components/ChartCard';
import { GoChevronDown } from 'react-icons/go';
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';
import { VideoModalContent } from './VideoModalContent';
const ReactDOM = require('react-dom')
const ReactMarkdown = require('react-markdown')
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 2px 16px 0 rgba(0,0,0,0.2)',
    border: 'none'
  }
};


class UsesExplanation extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="d-flex item-block">
        <i className={this.props.classCSS}></i>  
        <div className="d-flex flex-column items"> 
          {this.props.displaylabel != "" ? (<span className="uses-explanation-title">{this.props.displaylabel}</span>) : ""}
          {this.props.displaytext}
        </div>
      </div>
    )
  }
}

export class ChartDetails extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showModal: false,
      showVideoModal: false,
      showCEVModal: false,
      isCollapsed: props.isCollapsed,
      charts: props.charts
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleVideoOpenModal = this.handleVideoOpenModal.bind(this);
    this.handleVideoCloseModal = this.handleVideoCloseModal.bind(this);
    this.handleOpenCEVModal = this.handleOpenCEVModal.bind(this);
    this.handleCloseCEVModal = this.handleCloseCEVModal.bind(this);
    this.host = null;
  }
  
  handleCollapseContent = () => {
    const isCollapsed = this.state.isCollapsed;
    if (isCollapsed) {
      this.setState({ isCollapsed: false });
    } else {
      this.setState({ isCollapsed: true });
    }
  }
  createLink = (listOfLink) => {
    let div = [];
    for (let i = 0; i < listOfLink.length; i++) {
      div.push(
        <a key={i} href={listOfLink[i].url}><span key={i}> {listOfLink[i].name} </span></a>
      )
    }
    return div;
  }

  getMaintainerList = (listofMaintainers) => {
    let div = [];
    for (let i = 0; i < listofMaintainers.length; i++) {
      div.push(<span key={i}>{listofMaintainers[i].name}</span>, <a href={listofMaintainers[i].email} key={listofMaintainers[i].email}><span key={i}> {listofMaintainers[i].email} </span></a>)
    }
    return div;
  }
  getPlatformList = (listofPlatforms) => {
    let div = [];
    if (listofPlatforms != null && listofPlatforms.length > 0) {
      div.push(<span className="uses-explanation-title"> Platforms</span>)
      for (let i = 0; i < listofPlatforms.length; i++) {
        div.push(<span key={i}>{listofPlatforms[i]}</span>)
      }
    }
    return div
  }
  
  getMaturityOfExperiment = (maturityOfExperiment) => {
    let div = [];
    if (maturityOfExperiment != '') {
      div.push(<span className="uses-explanation-title"> Maturity</span>)
        div.push(<span >{maturityOfExperiment}</span>)
    }
    return div
  }
  
  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleVideoOpenModal(){ 
    this.setState({showVideoModal:true});
  }
  handleVideoCloseModal() {
    this.setState({ showVideoModal: false });
  }

  handleOpenCEVModal() {
    this.setState({ showCEVModal: true });
  }


  handleNavHome = () => {
    this.props.history.push('/');
  }
  handleNavToExperiment = (chartName,experiments) => {
    this.props.history.push(`/charts/${chartName}/experiments/${experiments}`);
  }

  renderExperiments = function() {
    let logo = "https://raw.githubusercontent.com/litmuschaos/chaos-charts/master/charts/"+this.props.charts.metadata.name+"/icons/"
    let displayName = this.props.charts.metadata.name;
      const experiments = this.props.charts.experiments.map(
      chart => <Link to={`/charts/${displayName}/experiments/${chart.metadata.name}`}>
      <ChartCard 
      isCard='true' 
      key={chart.metadata.name} 
      title={chart.spec.displayName} 
      analytics={this.props.analytics.filter(exp=>exp.Label == chart.metadata.name)}
      chaosType={chart.spec.chaosType}
      chartType={this.props.charts.metadata.name}
      provider={chart.spec.provider.name}
      text={chart.metadata.annotations.chartDescription} 
      icon={logo + chart.metadata.name +".png"} 
      id={chart.metadata.name} />
      </Link>)
    return (
      [...experiments]
    )
  }

  displayLinkCreator = () => {
    this.host = window.location.host
    this.hostname = window.location.hostname
    var path = this.props.charts.spec.chaosExpCRDLink
    path = path.split("/charts/")[1]
    var prefixPath = "https://"
    var suffixPath = "/api/chaos?file=charts/"
    if (this.hostname === "localhost") {
      prefixPath = "http://"
      this.host = "localhost:8080"
      suffixPath = "/chaos?file=charts/"
    }
    var displayRepoPath = prefixPath+this.host+suffixPath+path
    return displayRepoPath
  }

  showCards(flag) {
    if (!flag) {
      return null;
    } else {
      return (
        <div>
          <h3>Chaos Experiments</h3>
           <div className="d-flex">
             {this.renderExperiments()}
          </div>
        </div>
      );
    }
  }

  getFilePath() {
    console.log(this.props.charts.spec.displayName)
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleCloseCEVModal() {
    this.setState({ showCEVModal: false });
  }

  render() {
    const isCollapsed = classNames({
      'chart-details-content': true,
      'content-is-collapsed': this.state.isCollapsed,
      'content-is-open': !this.state.isCollapsed
    });

    return (
      <div className="chart-details-container">
      <div className="chart-details-header">
        <div className="chart-details-title-container" onClick={this.handleCollapseContent}>
          <span className="chart-details-title">{this.props.name}</span>
          <IconContext.Provider value={{ color: "#004ED6", size: '1.5em' }}>
            <GoChevronDown />
          </IconContext.Provider>
        </div>
        <button className="chart-install-button" onClick={this.handleOpenModal}>{this.props.install_button_text}</button>
      </div>
      <div className="metrics-message">{this.props.CountMessage} : {this.props.ChartCount}
      </div>
      <div className={isCollapsed}>
        <p className="chart-details-text">
          <ReactMarkdown source={this.props.charts.spec.categoryDescription} />         
          {this.props.charts.experiments===null ? 
          (<button className="yaml-view-button" onClick={this.handleOpenCEVModal}>View Engine YAML</button>):""}
        </p>
        <button className="chart-install-button-phone" onClick={this.handleOpenModal}>{this.props.install_button_text}</button>
        <div className="chart-details-uses-explanation">
          <div className="d-flex item-block">
            <i className="mi-link dark-gray"></i>  
            <div className="d-flex flex-column items"> 
              <span className="uses-explanation-title"> Useful links</span>
              {this.createLink(this.props.charts.spec.links)}
            </div>
          </div>
          <div className = "tutorial-video-container">
            {this.props.video!="" && this.props.charts.experiments===null ? (<button className ="tutorial-button" onClick={this.handleVideoOpenModal}><span className = "tutorial-title">Experiment Demo</span> <img className="tutorial-img" src={process.env.PUBLIC_URL + '/icons/play-square.png'}/></button>):("")}
          </div>
        </div>
        <button className="chart-install-button-phone" onClick={this.handleOpenModal}>{this.props.install_button_text}</button>
        <div className="chart-details-uses-explanation">
          <UsesExplanation classCSS = "mi-link dark-gray" displaylabel = "Useful Links" displaytext = {this.createLink(this.props.charts.spec.links)}/>
          <UsesExplanation classCSS = "mi-link dark-gray" displaylabel = "Maintainers" displaytext = {this.getMaintainerList(this.props.charts.spec.maintainers)}/>
          {this.props.charts.spec.platforms != null && <UsesExplanation classCSS = "mi-container dark-gray" displaylabel = "" displaytext = {this.getPlatformList(this.props.charts.spec.platforms)}/>}
          {this.props.charts.spec.maturity != '' &&  <UsesExplanation classCSS = "mi-chart-bar-up dark-gray" displaylabel = "" displaytext = {this.getMaturityOfExperiment(this.props.charts.spec.maturity)}/>}
        </div>
      </div>
      <Modal
        isOpen={this.state.showModal}
        contentLabel="Minimal Modal Example"
        style={customStyles}>
        <InstallModalContent expcrdurl={this.displayLinkCreator()} provider={this.props.charts.spec.provider.name} logo={this.props.logo} display displayName={this.props.charts.spec.displayName} />
        <button className="modal-close-button" onClick={this.handleCloseModal}><span className="modal-close rounded"></span></button>
      </Modal>
      <Modal
      isOpen={this.state.showVideoModal}
      contentLabel="Video Modal Example"
      style={customStyles}>
        <VideoModalContent
        video={this.props.video}>
        </VideoModalContent>
        <button className="modal-close-button" onClick={this.handleVideoCloseModal}><span className="modal-close rounded"></span></button>
      </Modal>
      <Modal
        isOpen={this.state.showCEVModal}
        contentLabel="Minimal Modal Example"
        style={customStyles}>
          
        <EngineViewerModalContent displayName={this.props.charts.spec.displayName} />
        
        <button className="modal-close-button" onClick={this.handleCloseCEVModal}><span className="modal-close rounded"></span></button>
      </Modal>
      <div>{this.props.charts.experiments===null? "":this.showCards(true)}</div>
      </div>
    )
  }
}