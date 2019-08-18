import * as React from 'react';
import ColorThief from 'colorthief';

export class ChartCard extends React.Component {
  getDominantIconColor = () => {
    const colorThief = new ColorThief();
    const icon = new Image(200, 200);
    icon.src = this.props.icon;
    return 'radial-gradient(rgb(' + colorThief.getColor(icon).join(', ') + '), white)';
  }
  render() {
    return (
      <div class="chart-card-container" onClick={this.props.navTo}>
        <div class="subchart-count-container">
          <span class="subchart-count">
            {this.props.subChartCount} Subcharts
          </span>
        </div>
        <div class="icon-container">
          <div class="logo-background-circle" style={{ background: this.getDominantIconColor()}}></div>
          <div class="icon-background">
            <img class="icon" src={this.props.icon} alt="chart logo"/>
          </div>
        </div>

        <div class="chart-title">
          {this.props.title}
        </div>
        <div class="chart-provider">
          Provided by {this.props.provider}
        </div>
        <p class="chart-description">
          {this.props.text}
        </p>
      </div>
    )
  }
}
