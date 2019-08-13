import * as React from 'react';

export class ChartCard extends React.Component {
  render() {
    return (
      <div class="chart-card-container">
        <div class="subchart-count-container">
          <span class="subchart-count">
            {this.props.subChartCount} Subcharts
          </span>
        </div>
        <div class="icon-container">
          chart logo placeholder
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
