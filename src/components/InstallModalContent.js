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
        <div class="modal-install-instruction"><span class="modal-install-instruction-number">1 -&nbsp;</span>Install Operator Lifecycle Manager (OLM), a tool to help manage the Operators running on your cluster.</div>
        <div class="modal-code">$ curl -sL https://github.com/operator-framework/operator-lifecycle-manager/releases/download/0.10.0/install.sh | bash -s 0.10.0</div>

        <div class="modal-install-instruction"><span class="modal-install-instruction-number">2 -&nbsp;</span>Install the operator by running the following command</div>
        <div class="modal-code">$ kubectl create -f https://operatorhub.io/install/openebs.yaml</div>

        <div class="modal-install-instruction"><span class="modal-install-instruction-number">3 -&nbsp;</span>After install, watch your operator come up using next command</div>
        <div class="modal-code">$ kubectl get csv -n operators</div>

        <div class="modal-footer-notes">To use it, checkout the custom resource definitions (CRDs) introduced by this operator to start using it.</div>

      </div>
    )
  }
}
