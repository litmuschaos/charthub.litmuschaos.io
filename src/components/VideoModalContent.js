import * as React from 'react';
import ReactPlayer from 'react-player';

export class VideoModalContent extends React.Component {

  constructor (props) {
    super();
    this.state = 
      {value:'', copied:false};
  }

  render() {
    return (
      <div className="video-modal-content">
        <div className="video-modal-header">
            <div className="modal-header-title-container">
                <h1 className="modal-title">Experiment Video</h1>
            </div>
            <div className="tutorial-video">
                <ReactPlayer url={this.props.video}/>
            </div>
        </div>
      </div>
    )
  }
}
