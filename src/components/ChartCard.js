import * as React from 'react';
// import * as Vibrant from 'node-vibrant';

export class ChartCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gradientCircle: {
        background: 'transparent'
      }
    }
  }
  
  render() {
   
    const listOrCardViewClass = this.props.isCard ? "chart-card-container" : "chart-card-container list-view"
    const renderChartContent = () => {
      return (<div>
                <div className={"icon-container"}>
                  <div className="logo-background-circle" style={this.state.gradientCircle}></div>
                  <div className="icon-background">
                    <img className="icon" src={this.props.icon} alt="chart logo"/>
                  </div>
                </div>
                <div className="chart-title">
                  {this.props.title}
                </div>
                <div className="chart-provider">
                  Contributed by {this.props.provider}
                </div>
                <p className="chart-description">
                  {this.props.text}
                </p>
              </div>)
    }
    const renderChartListContainer = (content) => {

      if(this.props.isCard){
        return renderChartContent()
      } else {
        return (<div className="list-view-width">
                  {renderChartContent()}
                </div>)
      }
    }
    return (
      <div className={listOrCardViewClass} onClick={this.props.navTo}>
        <div className="experiment-count-container">
         {this.props.experimentCount ?( <span className="experiment-count">
            {this.props.experimentCount} Chaos Experiments
          </span>):
          (<span className="experiment-chaos-type" >
             {this.props.chaosType ?( <i className ="mi-application infra-icon">
             <span className="chaos-tooltiptext ">
                    { this.props.chartType=="generic" ? ('Infra-Chaos :- Multiple applications might be impacted')
                                        :'Infra-Chaos :-  Multiple volumes sharing the same pool might be impacted' }
             </span>
             </i>):(<span></span>)}
           </span>)}
        </div>
        {renderChartListContainer()}
      </div>
    )
  }
}