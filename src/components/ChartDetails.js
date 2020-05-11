import React from "react";
import Modal from "react-modal";
import classNames from "classnames";
import { connect } from "react-redux";
import InstallModalContent from "../components/InstallModalContent";
import { ChartCard } from "../components/ChartCard";
import { GoChevronDown } from "react-icons/go";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { VideoModalContent } from "./VideoModalContent";
import { getVersion } from "../common/helpers";

const ReactMarkdown = require("react-markdown");

const customStyles = (isDarkTheme) => ({
  overlay: {
    backgroundColor: "#000000bf",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 2px 16px 0 #00000005",
    border: "none",
    color: isDarkTheme ? "#ffffff" : "#383842",
    backgroundColor: isDarkTheme ? "#2D2D2D" : "#fafafa",
    borderColor: "#b0b0b0",
  },
});

class UsesExplanation extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="d-flex item-block">
        <i className={this.props.classCSS}></i>
        <div className="d-flex flex-column items">
          {this.props.displaylabel !== "" ? (
            <span className="uses-explanation-title">
              {this.props.displaylabel}
            </span>
          ) : (
            ""
          )}
          {this.props.displaytext}
        </div>
      </div>
    );
  }
}

class ChartDetails extends React.Component {
  constructor(props) {
    super();
    this.state = {
      showModal: false,
      showVideoModal: false,
      isCollapsed: props.isCollapsed,
      charts: props.charts,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleVideoOpenModal = this.handleVideoOpenModal.bind(this);
    this.handleVideoCloseModal = this.handleVideoCloseModal.bind(this);
    this.host = null;
  }

  handleCollapseContent = () => {
    const isCollapsed = this.state.isCollapsed;
    if (isCollapsed) {
      this.setState({ isCollapsed: false });
    } else {
      this.setState({ isCollapsed: true });
    }
  };
  createLink = (listOfLink) => {
    try {
      let div = [];
      if (listOfLink) {
        for (let i = 0; i < listOfLink.length; i++) {
          div.push(
            <a key={i} href={listOfLink[i].url}>
              <span key={i}> {listOfLink[i].name}</span>
            </a>
          );
        }
        return div;
      }
    } catch (e) {
      console.log("Catch error:", e);
    }
  };

  getMaintainerList = (listofMaintainers) => {
    try {
      if (listofMaintainers) {
        let div = [];
        for (let i = 0; i < listofMaintainers.length; i++) {
          div.push(
            <span key={i}>{listofMaintainers[i].name}</span>,
            <a
              href={listofMaintainers[i].email}
              key={listofMaintainers[i].email}
            >
              <span key={i}> {listofMaintainers[i].email} </span>
            </a>
          );
        }
        return div;
      }
    } catch (e) {
      console.log("Catch error:", e);
    }
  };
  getPlatformList = (listofPlatforms) => {
    try {
      if (listofPlatforms) {
        let div = [];
        if (listofPlatforms != null && listofPlatforms.length > 0) {
          div.push(<span className="uses-explanation-title"> Platforms</span>);
          for (let i = 0; i < listofPlatforms.length; i++) {
            div.push(<span key={i}>{listofPlatforms[i]}</span>);
          }
        }
        return div;
      }
    } catch (e) {
      console.log("Catch error:", e);
    }
  };

  getMaturityOfExperiment = (maturityOfExperiment) => {
    try {
      if (maturityOfExperiment !== "") {
        let div = [];
        div.push(<span className="uses-explanation-title"> Maturity</span>);
        div.push(<span>{maturityOfExperiment}</span>);
        return div;
      }
    } catch (e) {
      console.log("Catch error:", e);
    }
  };

  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleVideoOpenModal() {
    this.setState({ showVideoModal: true });
  }
  handleVideoCloseModal() {
    this.setState({ showVideoModal: false });
  }

  handleNavHome = () => {
    this.props.history.push("/");
  };
  handleNavToExperiment = (chartName, experiments) => {
    this.props.history.push(`/charts/${chartName}/experiments/${experiments}`);
  };

  renderExperiments = function () {
    try {
      let logo =
        "https://raw.githubusercontent.com/litmuschaos/chaos-charts/master/charts/" +
        this.props.charts.metadata.name +
        "/icons/";
      let displayName = this.props.charts.metadata.name;
      const experiments = this.props.charts.experiments.map((chart) => (
        <Link to={`/charts/${displayName}/experiments/${chart.metadata.name}`}>
          <ChartCard
            isCard="true"
            key={chart.metadata.name}
            title={chart.spec.displayName}
            analytics={this.props.analytics.filter(
              (exp) => exp.Label === chart.metadata.name
            )}
            chaosType={chart.spec.chaosType}
            chartType={this.props.charts.metadata.name}
            provider={chart.spec.provider.name}
            text={chart.metadata.annotations.chartDescription}
            icon={logo + chart.metadata.name + ".png"}
            id={chart.metadata.name}
          />
        </Link>
      ));
      return [...experiments];
    } catch (e) {
      console.log("Catch error:", e);
    }
  };

  displayLinkCreator = () => {
    try {
      const chartVersion = getVersion(this.props.versions);
      this.host = window.location.host;
      this.hostname = window.location.hostname;
      var path = this.props.charts.spec.chaosExpCRDLink;
      path = path.split("/charts/")[1];
      var prefixPath = "https://";
      var suffixPath = "/api/chaos/" + chartVersion + "?file=charts/";
      if (this.hostname === "localhost") {
        prefixPath = "http://";
        this.host = "localhost:8080";
        suffixPath = "/chaos/" + chartVersion + "?file=charts/";
      }
      var displayRepoPath = prefixPath + this.host + suffixPath + path;
      return displayRepoPath;
    } catch (e) {
      console.log("Catch error:", e);
    }
  };

  showCards(flag) {
    if (flag) {
      return (
        <div>
          <h3>Chaos Experiments</h3>
          <div className="d-flex">{this.renderExperiments()}</div>
        </div>
      );
    }
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    console.log(this.props.isDarkTheme);
    try {
      const isCollapsed = classNames({
        "chart-details-content": true,
        "content-is-collapsed": this.state.isCollapsed,
        "content-is-open": !this.state.isCollapsed,
      });

      return (
        <div className="chart-details-container">
          <div className="chart-details-header">
            <div
              className="chart-details-title-container"
              onClick={this.handleCollapseContent}
            >
              <span className="chart-details-title">{this.props.name}</span>
              <IconContext.Provider value={{ size: "1.5em" }}>
                <GoChevronDown />
              </IconContext.Provider>
            </div>
            <button
              className="chart-install-button"
              onClick={this.handleOpenModal}
            >
              {this.props.install_button_text}
            </button>
          </div>
          <div className="metrics-message">
            {this.props.CountMessage} : {this.props.ChartCount}
          </div>
          <div className={isCollapsed}>
            <div className="chart-details-text-container">
              <div className="chart-details-text">
                <ReactMarkdown
                  source={this.props.charts.spec.categoryDescription}
                />
              </div>
              <div className="tutorial-video-container">
                {this.props.video !== "" &&
                this.props.charts.experiments === null ? (
                  <button
                    className="tutorial-button"
                    onClick={this.handleVideoOpenModal}
                  >
                    <span className="tutorial-title">Experiment Demo</span>
                    <div>
                      <img
                        alt="play-square"
                        className="tutorial-img"
                        src={process.env.PUBLIC_URL + "/icons/play-square.png"}
                      />
                    </div>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <button
              className="chart-install-button-phone"
              onClick={this.handleOpenModal}
            >
              {this.props.install_button_text}
            </button>
            <div className="chart-details-uses-explanation">
              <UsesExplanation
                classCSS="mi-link dark-gray"
                displaylabel="Useful Links"
                displaytext={this.createLink(this.props.charts.spec.links)}
              />
              <UsesExplanation
                classCSS="mi-link dark-gray"
                displaylabel="Maintainers"
                displaytext={this.getMaintainerList(
                  this.props.charts.spec.maintainers
                )}
              />
              {this.props.charts.spec.platforms != null && (
                <UsesExplanation
                  classCSS="mi-container dark-gray"
                  displaylabel=""
                  displaytext={this.getPlatformList(
                    this.props.charts.spec.platforms
                  )}
                />
              )}
              {this.props.charts.spec.maturity !== "" && (
                <UsesExplanation
                  classCSS="mi-chart-bar-up dark-gray"
                  displaylabel=""
                  displaytext={this.getMaturityOfExperiment(
                    this.props.charts.spec.maturity
                  )}
                />
              )}
            </div>
          </div>
          <Modal
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
            appElement={document.getElementById("root")}
            style={customStyles(this.props.isDarkTheme)}
          >
            <InstallModalContent
              expcrdurl={this.displayLinkCreator()}
              provider={this.props.charts.spec.provider.name}
              logo={this.props.logo}
              display
              displayName={this.props.charts.spec.displayName}
            />
            <button
              className="modal-close-button"
              onClick={this.handleCloseModal}
            >
              <span className="modal-close rounded"></span>
            </button>
          </Modal>
          <Modal
            isOpen={this.state.showVideoModal}
            contentLabel="Video Modal Example"
            appElement={document.getElementById("root")}
            style={customStyles(this.props.isDarkTheme)}
          >
            <VideoModalContent video={this.props.video}></VideoModalContent>
            <button
              className="modal-close-button"
              onClick={this.handleVideoCloseModal}
            >
              <span className="modal-close rounded"></span>
            </button>
          </Modal>

          <div>
            {this.props.charts.experiments === null ? "" : this.showCards(true)}
          </div>
        </div>
      );
    } catch (e) {
      console.log("Catch error:", e);
    }
  }
}

const mapStateToProps = (state) => ({
  isDarkTheme: state.theme.isDarkTheme,
});

export default connect(mapStateToProps)(ChartDetails);
