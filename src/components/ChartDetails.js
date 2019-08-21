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
      isCollapsed: props.isCollapsed
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
    return (
      <div className="chart-details-container">
        <div className="chart-details-header">
          <div className="chart-details-title-container" onClick={this.handleCollapseContent}>
            <span className="chart-details-title">OpenEBS</span>
            <IconContext.Provider value={{ color: "#004ED6", size: '1.5em' }}>
              <GoChevronDown />
            </IconContext.Provider>
          </div>
          <button className="chart-install-button" onClick={this.handleOpenModal}>INSTALL ALL</button>
        </div>
        <div className={isCollapsed}>
          <p className="chart-details-text">
            OpenEBS is a leading open source container attached storage solution that enables the use of containers for mission-critical, persistent workloads and for other stateful workloads such as logging or Prometheus for example. OpenEBS itself is deployed as just another container on your host and enables storage services that can be designated on a per pod, application, cluster or container level, including:<br />
            <br />
            Data persistence across nodes
            Synchronization of data across availability zones and cloud providers
            A common layer whether you are running on the cloud, or your bare metal
            Integration with Kubernetes, so developer and application intent flows into OpenEBS
            Management of tiering to and from S3 and other targets.
          </p>
          <button className="chart-install-button-phone" onClick={this.handleOpenModal}>INSTALL ALL</button>
          <div className="chart-details-uses-explanation">
            <span className="uses-explanation-title">Uses of this chart</span>
            <span className="uses-explanation">Lorem ipsum</span>

            <span className="uses-explanation-title">List of experiments</span>
            <span className="uses-explanation">Lorem ipsum</span>
            <span className="uses-explanation">Lorem ipsum dolor</span>

            <span className="uses-explanation-title">Useful links</span>
            <span className="uses-explanation">Lorem ipsum sit amet</span>
            <span className="uses-explanation">Lorem ipsum dolor</span>
          </div>
        </div>
        <Modal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           style={customStyles}>
            <InstallModalContent />
            <button className="modal-close-button" onClick={this.handleCloseModal}><span className="modal-close rounded"></span></button>
        </Modal>
      </div>
    )
  }
}
