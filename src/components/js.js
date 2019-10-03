

////##1
{/* <div className="d-flex item block">
         <div className = "d-flex flex-column bd-highlight mb-3">
          <div className="p-2 bd-highlight">
          <div className="chart-details-container">
          <div className="chart-details-header">
          <div className="chart-details-title-container" onClick={this.handleCollapseContent}>
            <span className="chart-details-title">{this.props.name}</span>
            <IconContext.Provider value={{ color: "#004ED6", size: '1.5em' }}>
              <GoChevronDown />
            </IconContext.Provider>
          </div>
          </div>
          <div className="p-2 bd-highlight">
          <p className="chart-details-text">
            {this.props.charts.spec.categoryDescription}
          </p>
          </div>
          <div className="p-2 bd-highlight">
          <div>
            <h3>Chaos Experiments</h3>
            <div className="d-flex">
              {this.renderExperiments()}
            </div> 
          </div>
          
          </div> 
          </div>
          </div>
          </div>
        <div className = "d-flex flex-column bd-highlight mb-3">
          
            <button className="chart-install-button" onClick={this.handleOpenModal}>INSTALL ALL CHARTS</button>
            <div className={isCollapsed}>
            <button className="chart-install-button-phone" onClick={this.handleOpenModal}>INSTALL ALL CHARTS</button>
              <div className="chart-details-uses-explanation">
             
                <div className="d-flex item-block">
                  <i className="mi-link dark-gray"></i>  <div className="d-flex flex-column items"> <span className="uses-explanation-title"> Useful links</span>
                    {this.createLink(this.props.charts.spec.links)}
                  </div>
              </div>
              <div className="d-flex item-block"> <i className="mi-user dark-gray"></i> <div className="d-flex flex-column items"> <span className="uses-explanation-title">Maintainers</span>
                {this.getMaintainerList(this.props.charts.spec.maintainers)}
              </div>
              </div>
            </div>
            
          </div>
          <Modal
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
            style={customStyles}>
            <InstallModalContent expcrdurl={this.props.charts.spec.chaosExpCRDLink} provider={this.props.charts.spec.provider.name} logo={this.props.logo} display displayName={this.props.displayName} />
            <button className="modal-close-button" onClick={this.handleCloseModal}><span className="modal-close rounded"></span></button>
          </Modal>
          
      </div>
      </div>
        */}
        // ####2
        <div className="chart-details-container">
        <div className="chart-details-header">
          <div className="chart-details-title-container" onClick={this.handleCollapseContent}>
            <span className="chart-details-title">{this.props.name}</span>
            <IconContext.Provider value={{ color: "#004ED6", size: '1.5em' }}>
              <GoChevronDown />
            </IconContext.Provider>
          </div>
          <button className="chart-install-button" onClick={this.handleOpenModal}>INSTALL ALL CHARTS</button>
        </div>
        <div className={isCollapsed}>
          <p className="chart-details-text">
            {this.props.charts.spec.categoryDescription}
          </p>
          <button className="chart-install-button-phone" onClick={this.handleOpenModal}>INSTALL ALL CHARTS</button>
          <div className="chart-details-uses-explanation">
            
            <div className="d-flex item-block">
              <i className="mi-link dark-gray"></i>  <div className="d-flex flex-column items"> <span className="uses-explanation-title"> Useful links</span>
                {this.createLink(this.props.charts.spec.links)}
              </div>
            </div>
            <div className="d-flex item-block"> <i className="mi-user dark-gray"></i> <div className="d-flex flex-column items"> <span className="uses-explanation-title">Maintainers</span>
              {this.getMaintainerList(this.props.charts.spec.maintainers)}
            </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          style={customStyles}>
          <InstallModalContent expcrdurl={this.props.charts.spec.chaosExpCRDLink} provider={this.props.charts.spec.provider.name} logo={this.props.logo} display displayName={this.props.displayName} />
          <button className="modal-close-button" onClick={this.handleCloseModal}><span className="modal-close rounded"></span></button>
        </Modal>
        <h3>Experiments</h3>
          <div className="d-flex">
            {this.renderExperiments()}
          </div> 
      </div>

<div className="chart-details-container">
<div className="chart-details-header">
  <div className="chart-details-title-container" onClick={this.handleCollapseContent}>
    <span className="chart-details-title">{this.props.name}</span>
    <IconContext.Provider value={{ color: "#004ED6", size: '1.5em' }}>
      <GoChevronDown />
    </IconContext.Provider>
  </div>
  <button className="chart-install-button" onClick={this.handleOpenModal}>INSTALL ALL CHARTS</button>
</div>
<div className={isCollapsed}>
  <p className="chart-details-text">
    {this.props.charts.spec.categoryDescription}
    <h3>Chaos Experiments</h3>
  <div className="d-flex">
    {this.renderExperiments()}
  </div> 
  </p>
  <button className="chart-install-button-phone" onClick={this.handleOpenModal}>INSTALL ALL CHARTS</button>
  <div className="chart-details-uses-explanation">
    
    <div className="d-flex item-block">
      <i className="mi-link dark-gray"></i>  <div className="d-flex flex-column items"> <span className="uses-explanation-title"> Useful links</span>
        {this.createLink(this.props.charts.spec.links)}
      </div>
    </div>
    <div className="d-flex item-block"> <i className="mi-user dark-gray"></i> <div className="d-flex flex-column items"> <span className="uses-explanation-title">Maintainers</span>
      {this.getMaintainerList(this.props.charts.spec.maintainers)}
    </div>
    </div>
  </div>
</div>
<Modal
  isOpen={this.state.showModal}
  contentLabel="Minimal Modal Example"
  style={customStyles}>
  <InstallModalContent expcrdurl={this.props.charts.spec.chaosExpCRDLink} provider={this.props.charts.spec.provider.name} logo={this.props.logo} display displayName={this.props.displayName} />
  <button className="modal-close-button" onClick={this.handleCloseModal}><span className="modal-close rounded"></span></button>
</Modal>

</div>
