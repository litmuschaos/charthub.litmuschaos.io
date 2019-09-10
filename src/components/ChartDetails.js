import * as React from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import { InstallModalContent } from '../components/InstallModalContent';

import { GoChevronDown } from 'react-icons/go';
import { IconContext } from "react-icons";

const customStyles = {
  content : {
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

export class ChartDetails extends React.Component {
  constructor (props) {
    super();
    this.state = {
      showModal: false,
      isCollapsed: props.isCollapsed,
      charts: props.charts
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleCollapseContent = () => {
    const isCollapsed = this.state.isCollapsed;
    if(isCollapsed) {
      this.setState({ isCollapsed: false });
    } else {
      this.setState({ isCollapsed: true });
    }
  }
  createLink = (listOfLink) => {
    let div = [];
    for(let i=0;i<listOfLink.length;i++){
      div.push(
        <a key={i} href={listOfLink[i].url}>{listOfLink[i].name}</a>
      )
    }
    return div;
  }
  getListOfExperiment = (listofExperiments,subchartlist) => {
    let div = [];
    if(subchartlist != null ){
      div.push(<span key="-1" className="uses-explanation-title">List of Subcharts</span>)
      for(let i=0; i<subchartlist.length;i++){
        div.push(<span key={i} >{subchartlist[i].spec.displayName} </span>)
      }
    }else{
      div.push(<span key="-1" className="uses-explanation-title">List of Experiments</span>)
      for(let i=0; i<listofExperiments.length; i++){
       div.push(<span key={i}> {listofExperiments[i].slice(0,-9).replace(/-/ig," ")}</span>)
     }
    }
    return div;
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }
  render() {
    const isCollapsed = classNames({
      'chart-details-content': true,
      'content-is-collapsed': this.state.isCollapsed,
      'content-is-open': !this.state.isCollapsed
    });
    console.log(this.props.charts);
    return (
      <div className="chart-details-container">
        <div className="chart-details-header">
          <div className="chart-details-title-container" onClick={this.handleCollapseContent}>
            <span className="chart-details-title">{this.props.name}</span>
            <IconContext.Provider value={{ color: "#004ED6", size: '1.5em' }}>
              <GoChevronDown />
            </IconContext.Provider>
          </div>
          <button className="chart-install-button" onClick={this.handleOpenModal}>INSTALL ALL</button>
        </div>
        <div className={isCollapsed}>
          <p className="chart-details-text">
             {this.props.charts.spec.description}
          </p>
          <button className="chart-install-button-phone" onClick={this.handleOpenModal}>INSTALL ALL</button>
          <div className="chart-details-uses-explanation">
                {this.getListOfExperiment(this.props.charts.spec.experiments,this.props.charts.subCharts)}
            <span className="uses-explanation-title">Useful links</span>
                {this.createLink(this.props.charts.spec.links)}
          </div>
        </div>
        <Modal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           style={customStyles}>
            <InstallModalContent expcrdurl={this.props.charts.spec.chaosExpCRDLink} />
            <button className="modal-close-button" onClick={this.handleCloseModal}><span className="modal-close rounded"></span></button>
        </Modal>
      </div>
    )
  }
}
