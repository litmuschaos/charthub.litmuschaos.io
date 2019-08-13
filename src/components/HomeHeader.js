import * as React from 'react';

export class HomeHeader extends React.Component {

  createHexagonGrid = () => {
    const positions = [{
      top: '422px',
      left: '16px'
    }, {
      top: '212px',
      left: '16px'
    }, {
      top: '422px',
      left: '166px'
    }, {
      top: '212px',
      left: '166px'
    }, {
      top: '482px',
      left: '566px'
    }, {
      top: '322px',
      left: '626px'
    }, {
      top: '92px',
      left: '666px'
    }, {
      top: '52px',
      left: '576px'
    }, {
      top: '-58px',
      left: '396px'
    }, {
      top: '452px',
      left: '1116px'
    }, {
      top: '182px',
      left: '1106px'
    }]


    let grid = [];

    for(let i = 0; i < 10; i++) {
      if(positions[i]) {
        positions[i].position = 'absolute'
        grid.push(<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="174" viewBox="0 0 200 173.20508075688772" style={positions[i]}>
          <path fill="transparent" stroke="white" opacity="0.17"  strokeWidth="3px" d="M0 86.60254037844386L50 0L150 0L200 86.60254037844386L150 173.20508075688772L50 173.20508075688772Z"></path>
        </svg>)
        // let svgStyle = {
        //   top: positions[i].top.split('px')[0] + 50 + 'px',
        //   left: positions[i].left.split('px')[0] + 50 + 'px',
        //   position: 'absolute'
        // }
        // grid.push(<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100" height="87" viewBox="0 0 100 86.60254037844386" style={svgStyle}><path fill="transparent" stroke="white" opacity="0.17"  strokeWidth="3px" d="M2.5000000000000004 47.63139720814412Q0 43.30127018922193 2.5000000000000004 38.97114317029974L22.5 4.330127018922193Q25 0 30 0L70 0Q75 0 77.5 4.330127018922193L97.5 38.97114317029974Q100 43.30127018922193 97.5 47.63139720814412L77.5 82.27241335952166Q75 86.60254037844386 70 86.60254037844386L30    86.60254037844386Q25 86.60254037844386 22.5 82.27241335952166Z"></path>
        // </svg>)
      }
        // grid.push(<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="220" height="191" viewbox="0 0 220 190.5255888325765" style={svgStyle}>
        //   <path fill="transparent" stroke="white" opacity="0.17"  strokeWidth="3px" d="M2.5000000000000004 99.59292143521044Q0 95.26279441628824 2.5000000000000004 90.93266739736605L52.5 4.330127018922193Q55 0 60 0L160 0Q165 0 167.5 4.330127018922193L217.5 90.93266739736605Q220 95.26279441628824 217.5 99.59292143521044L167.5 186.1954618136543Q165 190.5255888325765 160 190.5255888325765L60 190.5255888325765Q55 190.5255888325765 52.5 186.1954618136543Z"></path>
        // </svg>)
    }
    return grid;
  }

  render() {
    return (
      <div class="home-header-container">
        <div class="home-hexagon-container">
          {this.createHexagonGrid()}
        </div>
        <div class="top-header-container">
          <div class="top-header-divide-container">
            <img src={process.env.PUBLIC_URL + '/litmus.png'} class="logo-img"/>
            <h3 class="page-title">Litmus</h3>
          </div>
          <div class="top-header-divide-container">
            <input class="top-header-input" placeholder="Search for charts..."/>
            <h3 class="top-header-contribute">Contribute</h3>
          </div>
        </div>
        <h1 class="home-header-title-1">Hub for Litmus Charts</h1>
        <h2 class="home-header-title-2">Home for Kubernetes chaos community to share the chaos tests</h2>
        <h3 class="home-header-title-3">Download a chart. Tune it to your environment. Run chaos. Improve resilience.</h3>
      </div>
    );
  }
}
