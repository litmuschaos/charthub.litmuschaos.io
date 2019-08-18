import * as React from 'react';
import * as Vibrant from 'node-vibrant';

export class ChartCard extends React.Component {
  async getDominantIconColor() {
    const icon = new Image(200, 200);
    icon.src = this.props.icon;
    const palette = await new Vibrant(icon).getPalette()
    return `radial-gradient(rgb(${palette.Vibrant._rgb.join(',')}), white)`;
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
          <div className="logo-background-circle" style={{ background: this.getDominantIconColor()}}></div>
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
