import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaHome } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import { analyticsData, loadVersion } from "../redux/actions";
import {
  filterChartsOnSearch,
  loadCharts,
  toggleTheme,
} from "../redux/actions";
import { getVersion } from "../common/helpers";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class HomeHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
    };
  }
  componentDidMount() {
    this.props.loadVersion();
    // TODO: Remove the usages of setInterval
    this.timer = setInterval(() => {
      this.props.loadCharts(getVersion(this.props.versions));
      if (this.props.versions.length > 0) {
        const version = localStorage.getItem("version");
        if (version === null || version === "") {
          localStorage.setItem("version", this.props.versions[0]);
        }
        clearInterval(this.timer);
      }
    }, 500);
    this.props.analyticsData();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  renderHomeText = () => {
    if (this.props.showHomeText) {
      return [
        <h1 key="1" className="home-header-title-1">
          Chaos Charts for Kubernetes
        </h1>,
        <h2 key="2" className="home-header-title-2">
          Charts are pre-defined chaos experiments. Use these charts to inject
          chaos into cloud native applications and Kubernetes infrastructure.
        </h2>,
        <h3 key="3" className="home-header-title-3">
          BROWSE - RUN - CONTRIBUTE
        </h3>,
      ];
    }
  };

  renderChartTitle = () => {
    if (!this.props.showHomeText) {
      return (
        <div className="chart-header-title-container">
          <div className="chart-header-logo-container">
            <img alt="org logo" src={this.props.icon} height="30px" />
          </div>
          <div className="chart-header-title">{this.props.title}</div>
        </div>
      );
    }
  };

  getHeaderHeight = () => {
    let height = "300px";
    if (!this.props.showHomeText) {
      height = "272.5px";
    }
    return {
      height,
    };
  };

  handleSearchTermChange = (evt) => {
    try {
      if (evt) {
        const searchTerm = evt.target.value;
        this.setState({ searchTerm });
        this.props.filterChartsOnSearch(searchTerm);
      }
    } catch (e) {
      console.log("Catch error:", e);
    }
  };

  changeVersion = (version) => {
    localStorage.setItem("version", version.value);
    this.props.loadCharts(localStorage.getItem("version"));
    this.props.history.push("/");
    window.location.reload();
  };

  render() {
    try {
      return (
        <div className="hero-bg">
          <div className="home-header-container" style={this.getHeaderHeight()}>
            <div className="top-header-container">
              <a
                href="https://litmuschaos.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="top-header-divide-container">
                  <img
                    alt="organization logo"
                    src={process.env.PUBLIC_URL + "/icons/litmus.png"}
                    className="logo-img"
                  />
                </div>
              </a>
              <Link to={process.env.PUBLIC_URL} className="home">
                <h3 className="top-header-home">{<FaHome />}</h3>
              </Link>
              <input
                className="top-header-input"
                placeholder="Search for charts..."
                value={this.state.searchTerm}
                onChange={this.handleSearchTermChange}
              />
              <a
                href="https://github.com/litmuschaos/community-charts/blob/master/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="top-header-contribute">
                  Contribute
                  <span className="contribute-icon-container">
                    {/*<FaChevronDown />*/}
                  </span>
                </h3>
              </a>
              <a
                href="https://docs.litmuschaos.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="top-header-contribute">
                  Docs<span className="contribute-icon-container"></span>
                </h3>
              </a>
              <Dropdown
                options={this.props.versions}
                onChange={this.changeVersion}
                value={getVersion(this.props.versions)}
              />

              <div
                className="top-header-theme-changer"
                onClick={() => this.props.toggleTheme()}
              >
                Light
              </div>
            </div>

            {this.renderHomeText()}
            {this.renderChartTitle()}
          </div>
        </div>
      );
    } catch (e) {
      console.log("Catch error:", e);
    }
  }
}

const mapStateToProps = (state) => {
  try {
    if (state) {
      return {
        analytics: state.charts.analytics,
        versions: state.charts.versions,
        isDarkTheme: state.theme.isDarkTheme,
      };
    }
  } catch (e) {
    console.log("Catch error:", e);
  }
};

const mapDispatchToProps = {
  filterChartsOnSearch,
  analyticsData,
  loadCharts,
  loadVersion,
  toggleTheme,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
