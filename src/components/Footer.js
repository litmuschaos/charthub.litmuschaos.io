import * as React from 'react';
import CountUp from 'react-countup';
class Footer extends React.Component {
    
    render() {
        return (
         <footer className = "footer">
           <div className="metrics">
                  <div className="installation-metrics">
                    <div className="metrics-numeric">
                    <CountUp start = {0} end = {this.props.operatorMetrics?this.props.operatorMetrics:0} duration={8}></CountUp>
                    </div>
                    <div className="metrics-label">CHAOS OPERATOR INSTALLED</div>
                  </div>
                  <div className="installation-metrics">
                    <div className="metrics-numeric">
                    <CountUp start = {0} end = {this.props.totalExperiments?this.props.totalExperiments:0} duration={8}></CountUp>
                    </div>
                    <div className="metrics-label">TOTAL EXPERIMENTS</div>
                  </div>
                  <div className="installation-metrics">
                    <div className="metrics-numeric">
                    <CountUp start = {0} end = {this.props.totalExperimentsRun?this.props.totalExperimentsRun:0} duration={8}></CountUp>
                    </div>
                    <div className="metrics-label">TOTAL EXPERIMENTS RUN</div>
                  </div>
                  {/* <div className="installation-metrics">
                    <div className="metrics-numeric">600</div>
                    <div className="metrics-label">GITHUB STARS</div>
                  </div>
                  <div className="installation-metrics">
                    <div className="metrics-numeric">1000</div>
                    <div className="metrics-label">SLACK MEMBERS</div>
                  </div> */}
                  
           </div>
           <div className = "footer-bottom">
              <div>{this.func}</div>
                
                <div className="copyright">
                  <div>
                    <img alt="organization logo" src={process.env.PUBLIC_URL + '/icons/mayadata-white-logo.png'} className="logo-img"/>
                  </div>
                  <div className ="copyright-text">
                  Copyright &copy; 2020 MayaData Inc. 
                  </div>
                </div>
                <div className="links-content">
                  <span className="link"> 
                      <a href="https://twitter.com/LitmusChaos" >Twitter</a>
                  </span>
                  <span className="link"> 
                      <a href="https://blog.mayadata.io/tag/litmus" >Blog</a>
                  </span> 
                  <span className="link"> 
                      <a href="https://litmuschaos.io/" >Litmuschaos.io</a>
                  </span> 
                  <span className="link"> 
                      <a href="https://mayadata.io/aboutus" >About Us</a>
                  </span>
                </div>
               
           </div>
         </footer>
        
    )} 
}
  
 export default (Footer);
  