import * as React from 'react';

export class InstallModalContent extends React.Component {

  constructor (props) {
    super();
  }

  render() {
    return (
      <div className="install-modal-content">
        <div className="modal-header">
          <div className="modal-img-placeholder"></div>
          <div className="modal-header-title-container">
            <h1 className="modal-title">OpenEBS</h1>
            <span className="modal-subtitle">1.0.0 provided by OpenEBS project</span>
          </div>
         
        </div>
        <h3 className="install-title">Install on Kubernetes</h3>
        <div className="modal-install-instruction"><span className="modal-install-instruction-number">1 -&nbsp;</span>Install litmus Operator, a tool for for injecting chaos experiments on Kubernetes</div>
        <div className="modal-code">https://github.com/litmuschaos/chaos-operator/blob/master/README.md</div>

        <div className="modal-install-instruction"><span className="modal-install-instruction-number">2 -&nbsp;</span>Run Litmus Test</div>
        <div className="modal-code">$ kubectl create -f  {this.props.expcrdurl}</div>
      </div>
    )
  }
}
