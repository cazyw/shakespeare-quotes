import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
  constructor(props){
    super(props);
    this.toggleSections = this.toggleSections.bind(this);
    this.showPostSection = this.showPostSection.bind(this);
    this.showSearchSection = this.showSearchSection.bind(this);
    this.parentFunction = this.parentFunction.bind(this);
  }

  parentFunction() {
    this.props.displayAllQuotes();
  }

  toggleSections(sectionToOpen, sectionToClose1, sectionToClose2){
    if (document.getElementById(sectionToClose1).classList.contains('open') || 
        document.getElementById(sectionToClose2).classList.contains('open')){
      document.getElementById(sectionToClose1).classList.remove('open');
      document.getElementById(sectionToClose2).classList.remove('open');
      setTimeout(() => {
        document.getElementById(sectionToOpen).classList.add('open');
      }, 750);
    } else {
      document.getElementById(sectionToOpen).classList.add('open');
    }
  }

  showPostSection() {
    this.toggleSections('post-quote','search','quote-display-container');
  }

  showSearchSection() {
    this.toggleSections('search','post-quote','quote-display-container'); 
  }

  render(){
    return (
      <header>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">
                <span className="glyphicon glyphicon glyphicon glyphicon-tower"></span>Shakespeare
              </a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li onClick={this.showPostSection}><a>Add Quote</a></li>
                <li onClick={this.showSearchSection}><a>Search</a></li>
                <li onClick={this.parentFunction}><a>All</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  displayAllQuotes: PropTypes.func
};
  