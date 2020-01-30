import React, { Component } from 'react';

export class EngineViewerModalContent extends React.Component {

  constructor (props) {
    super();
    this.state = 
      {value:'', copied:false};
  }

  render() {
    const { content } = this.props;
    return (
      <div className="install-modal-content">
        <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/railscasts.css" />
        <div className="modal-header">
            <div className="install-title">
                <h3 >{"Chaos Engine for " + this.props.displayName }</h3>
            </div>
            <div className="chart-details-uses-explanation">
                <div className="d-flex item-block">
                <pre>{`
                    public class Main {
                        int a = 10;
                        print a
                    }
                `}</pre>
                </div>
            
          </div>
        </div>
      </div>
    )
  }
}

