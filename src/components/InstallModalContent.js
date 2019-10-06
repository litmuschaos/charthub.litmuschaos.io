import * as React from "react";

export class InstallModalContent extends React.Component {
  constructor(props) {
    super();
    this.state = { value: "", copied: false };
  }

  copyToClipboard = e => {
    console.log("got it");
    var textField = document.createElement("textarea");
    textField.innerText = this.command();
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    e.target.focus();
    setTimeout(
      function() {
        this.setState({ copied: false });
      }.bind(this),
      5000
    );
    this.setState({ copied: true });
  };

  command() {
    return `kubectl create -f ${this.props.expcrdurl}`;
  }

  render() {
    return (
      <div className="install-modal-content">
        <div className="modal-header">
          <div className="modal-img-placeholder">
            {" "}
            <img src={this.props.logo} />
          </div>
          <div className="modal-header-title-container">
            <h1 className="modal-title">{this.props.displayName}</h1>
            <span className="modal-subtitle">
              Provided by {this.props.provider}
            </span>
          </div>
        </div>

        <h3 className="install-title">Install the Chaos Experiments</h3>

        <div className="modal-install-instruction">
          <span className="modal-install-instruction-number"></span>You can
          install the Chaos Experiments by following command
        </div>
        <div
          className="modal-install-code-row"
        >
          <div className="modal-code">{this.command()}</div>
          {document.queryCommandSupported("copy") && (
            <div>
              {!this.state.copied && (
                <button
                  onClick={this.copyToClipboard}
                  className="modal-install-clipboard"
                >
                  <i className="mi-clipboard-pen"></i>
                </button>
              )}
              {this.state.copied && <span>Copied</span>}
            </div>
          )}
        </div>
        <div className="modal-install-instruction">
          <span className="modal-install-instruction-number gray-text-color">
            Notes:
          </span>
        </div>

        <div className="modal-install-instruction">
          <span className="modal-install-instruction-number"></span>
          <a href="https://github.com/litmuschaos/chaos-operator/blob/master/README.md">
            Install Litmus Operator,{" "}
          </a>
          a tool for for injecting chaos experiments on Kubernetes
        </div>
        {/* <div>       <a href="https://github.com/litmuschaos/chaos-operator/blob/master/README.md"> https://github.com/litmuschaos/chaos-operator/blob/master/README.md </a></div> */}
      </div>
    );
  }
}
