import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './Header.css';

export default class Header extends Component {
  constructor(props){
    super(props);
    this.toggleSections = this.toggleSections.bind(this);
    this.showPostSection = this.showPostSection.bind(this);
    this.showSearchSection = this.showSearchSection.bind(this);
    this.displayAll = this.displayAll.bind(this);
  }

  displayAll() {
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

  // <li onClick={this.showPostSection}><a data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">Add Quote</a></li>
  //               <li onClick={this.showSearchSection}><a data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">Search</a></li>
  //               <li onClick={this.displayAll}><a data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">All</a></li>
              

  showPostSection() {
    this.toggleSections('quote-post-container','quote-search-container','quote-display-container');
    this.props.displayNoQuotes();
  }
  
  showSearchSection() {
    this.toggleSections('quote-search-container','quote-post-container','quote-display-container'); 
    this.props.displayNoQuotes();
  }

  // <nav className="navbar navbar-default navbar-fixed-top">
  //         <div className="container-fluid">
  //           <div className="navbar-header">
  //             <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
  //               <span className="sr-only">Toggle navigation</span>
  //               <span className="icon-bar"></span>
  //               <span className="icon-bar"></span>
  //               <span className="icon-bar"></span>
  //             </button>
  //             <a className="navbar-brand" href="/">
  //               <span className="glyphicon glyphicon glyphicon glyphicon-tower"></span>Shakespeare
  //             </a>
  //           </div>
  //           <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
  //             <ul className="nav navbar-nav navbar-right">
  //               <li onClick={this.showPostSection}><a>Add Quote</a></li>
  //               <li onClick={this.showSearchSection}><a>Search</a></li>
  //               <li onClick={this.displayAll}><a>All</a></li>
  //             </ul>
  //           </div>
  //         </div>
  //       </nav>

  render(){
    return (
      <header>
        <Navbar fixedTop collapseOnSelect>
          <Navbar.Header>
          <Navbar.Brand>
            <a href="/"><span className="glyphicon glyphicon glyphicon glyphicon-tower"></span>Shakespeare</a>
          </Navbar.Brand>
          <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} onClick={this.showPostSection} >
                Add Quote
              </NavItem>
              <NavItem eventKey={2} onClick={this.showSearchSection}>
                Search
              </NavItem>
              <NavItem eventKey={3} onClick={this.displayAll}>
                All
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

Header.propTypes = {
  displayAllQuotes: PropTypes.func
};
  