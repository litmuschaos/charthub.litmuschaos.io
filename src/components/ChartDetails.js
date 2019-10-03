import * as React from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import { InstallModalContent } from '../components/InstallModalContent';
import { ChartCard } from '../components/ChartCard';
import { GoChevronDown } from 'react-icons/go';
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';
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

export class ChartDetails extends React.Component {
  constructor(props) {
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
  // getListOfExperiment = (listofExperiments) => {
  //   let div = [];

  //   // if (experimentlist != null) {
  //   //   div.push(<span key="-1" className="uses-explanation-title">  List of Subcharts</span>)
  //   //   for (let i = 0; i < experimentlist.length; i++) {
  //   //     div.push(<span key={i} >{experimentlist[i].spec.displayName} </span>)
  //   //   }
  //   // } else 
  //   if (listofExperiments != null) {
  //     div.push(<span key="-1" className="uses-explanation-title"> List of Experiments</span>)
  //     for (let i = 0; i < listofExperiments.length; i++) {
  //       div.push(<span key={i}> {listofExperiments[i].slice(0, -9).replace(/-/ig, " ")}</span>)
  //     }
  //   }
  //   return div;
  // }
  getMaintainerList = (listofMaintainers) => {
    let div = [];
    for (let i = 0; i < listofMaintainers.length; i++) {
      div.push(<span key={i}>{listofMaintainers[i].name}</span>, <a href={listofMaintainers[i].email} key={listofMaintainers[i].email}><span key={i}> {listofMaintainers[i].email} </span></a>)
    }
    return div;
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleNavHome = () => {
    this.props.history.push('/');
  }
  handleNavToExperiment = (chartName,experiments) => {
    this.props.history.push(`/charts/${chartName}/experiments/${experiments}`);
  }

  renderExperiments = function() {
    
    let logo = this.props.charts.spec.icons[0].link;
    let displayName = this.props.charts.metadata.name;
    console.log("displayName");
    const experiments = this.props.charts.experiments.map(chart => <Link to={`/charts/${displayName}/experiments/${chart.metadata.name}`}><ChartCard isCard='true' key={chart.metadata.name} title={chart.spec.displayName} provider={chart.spec.provider.name} text={chart.metadata.annotations.chartDescription} icon={logo} id={chart.metadata.name} /></Link>)
    return (
      [...experiments]
    )
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

  handleCloseModal() {
    this.setState({ showModal: false });
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
        <button className="chart-install-button" onClick={this.handleOpenModal}>INSTALL ALL CHARTS</button>
      </div>
      <div className={isCollapsed}>
        <p className="chart-details-text">
          {this.props.charts.spec.categoryDescription}
          {this.props.charts.experiments===null? "":this.showCards(true)}
        </p>
        <button className="chart-install-button-phone" onClick={this.handleOpenModal}>INSTALL ALL CHARTS</button>
        <div className="chart-details-uses-explanation">
          
          <div className="d-flex item-block">
            <i className="mi-link dark-gray"></i>  <div className="d-flex flex-column items"> <span className="uses-explanation-title"> Useful links</span>
              {this.createLink(this.props.charts.spec.links)}
            </div>
          </div>
          <div className="d-flex item-block"> <i className="mi-user dark-gray"></i> <div className="d-flex flex-column items"> <span className="uses-explanation-title">Maintainers</span>
            {this.getMaintainerList(this.props.charts.spec.maintainers)}
          </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={this.state.showModal}
        contentLabel="Minimal Modal Example"
        style={customStyles}>
        <InstallModalContent expcrdurl={this.props.charts.spec.chaosExpCRDLink} provider={this.props.charts.spec.provider.name} logo={this.props.logo} display displayName={this.props.displayName} />
        <button className="modal-close-button" onClick={this.handleCloseModal}><span className="modal-close rounded"></span></button>
      </Modal>

      
    
      </div>
      




    )
  }
}
