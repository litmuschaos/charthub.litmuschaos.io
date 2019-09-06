import * as React from 'react';

export class InstallModalContent extends React.Component {
  render() {
    return (
      <div class="install-modal-content">
        <div class="modal-header">
          <div class="modal-img-placeholder"></div>
          <div class="modal-header-title-container">
            <h1 class="modal-title">OpenEBS</h1>
            <span class="modal-subtitle">1.0.0 provided by OpenEBS project</span>
          </div>
        </div>
        <h3 class="install-title">Install on Kubernetes</h3>
        <div class="modal-install-instruction"><span class="modal-install-instruction-number">1 -&nbsp;</span>Install litmus Operator, a tool for for injecting chaos experiments on Kubernetes</div>
        <div class="modal-code">https://github.com/litmuschaos/chaos-operator/blob/master/README.md</div>

        <div class="modal-install-instruction"><span class="modal-install-instruction-number">2 -&nbsp;</span>Run Litmus Test</div>
        <div class="modal-code">$ kubectl create -f https://operatorhub.io/install/openebs.yaml</div>
{/* 
        <div class="modal-install-instruction"><span class="modal-install-instruction-number">3 -&nbsp;</span>After install, watch your operator come up using next command</div>
        <div class="modal-code">$ kubectl get csv -n operators</div>

        <div class="modal-footer-notes">To use it, checkout the custom resource definitions (CRDs) introduced by this operator to start using it.</div> */}

      </div>
    )
  }
}
