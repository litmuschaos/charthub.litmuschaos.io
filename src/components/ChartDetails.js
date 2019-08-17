import * as React from 'react';
import Modal from 'react-modal';

import { InstallModalContent } from '../components/InstallModalContent';

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
  constructor () {
    super();
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }
  render() {
    return (
      <div class="chart-details-container">
        <div class="chart-details-header">
          <div class="chart-details-title-container">
            <span class="chart-details-title">OpenEBS</span>
          </div>
          <button class="chart-install-button" onClick={this.handleOpenModal}>INSTALL ALL</button>
        </div>
        <div class="chart-details-content">
          <p class="chart-details-text">
            OpenEBS is a leading open source container attached storage solution that enables the use of containers for mission-critical, persistent workloads and for other stateful workloads such as logging or Prometheus for example. OpenEBS itself is deployed as just another container on your host and enables storage services that can be designated on a per pod, application, cluster or container level, including:<br />
            <br />
            Data persistence across nodes
            Synchronization of data across availability zones and cloud providers
            A common layer whether you are running on the cloud, or your bare metal
            Integration with Kubernetes, so developer and application intent flows into OpenEBS
            Management of tiering to and from S3 and other targets.
          </p>

          <div class="chart-details-uses-explanation">
            <span class="uses-explanation-title">Uses of this chart</span>
            <span class="uses-explanation">Lorem ipsum</span>

            <span class="uses-explanation-title">List of experiments</span>
            <span class="uses-explanation">Lorem ipsum</span>
            <span class="uses-explanation">Lorem ipsum dolor</span>

            <span class="uses-explanation-title">Useful links</span>
            <span class="uses-explanation">Lorem ipsum sit amet</span>
            <span class="uses-explanation">Lorem ipsum dolor</span>
          </div>
        </div>
        <Modal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           style={customStyles}>
            <InstallModalContent />
            <button class="modal-close-button" onClick={this.handleCloseModal}>Close Modal</button>
        </Modal>
      </div>
    )
  }
}
