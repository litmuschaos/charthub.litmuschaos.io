import * as React from 'react';
import * as Vibrant from 'node-vibrant';

export class ChartCard extends React.Component {
  constructor() {
    super()
    this.state = {
      gradientCircle: {
        background: 'transparent'
      }
    }
  }
  componentDidMount() {
    const icon = new Image(200, 200);
    icon.src = this.props.icon;
    var context = this;
    new Vibrant(icon).getPalette((err, palette) => {
      console.log(palette);
      context.setState({
        gradientCircle: {
          background: `radial-gradient(rgb(${palette.DarkVibrant._rgb.join(',')}), white)`
        }
      })
    })
  }
  render() {
    return (
      <div className="chart-card-container" onClick={this.props.navTo}>
        <div className="subchart-count-container">
          <span className="subchart-count">
            {this.props.subChartCount} Subcharts
          </span>
        </div>
        <div className="icon-container">
          <div className="logo-background-circle" style={this.state.gradientCircle}></div>
          <div className="icon-background">
            <img className="icon" src={this.props.icon} alt="chart logo"/>
          </div>
        </div>

        <div className="chart-title">
          {this.props.title}
        </div>
        <div className="chart-provider">
          Provided by {this.props.provider}
        </div>
        <p className="chart-description">
          {this.props.text}
        </p>
      </div>
    )
  }
}
