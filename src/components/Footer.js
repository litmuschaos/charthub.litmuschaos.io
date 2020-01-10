import * as React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { analyticsData } from "../redux/actions";

class Footer extends React.Component {
    constructor(props) {
        super();
    }
    componentDidMount() {
        this.props.analyticsData();
    }
    render() {
        return (
            <MDBFooter color="unique-color-dark" className="page-footer font-small pt-0">
            <div style={{ backgroundColor: "#23232A" }}>
              <MDBContainer fluid className="text-center text-md-left">
                <MDBRow className="py-4 d-flex align-items-center">
                  <MDBCol md="6" lg="5" className="text-center text-md-left mb-4 mb-md-0">
                    <h6 className="mb-0 white-text">
                      Get connected with us on social networks!
                    </h6>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
            </MDBFooter>
    )} 
}

const mapStateToProps = (state, ownProps) => {
    return {
      analytics: state.charts.analytics
    }
  };
  
  const mapDispatchToProps = {
    analyticsData
  };
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));
  