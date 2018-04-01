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
        this.props.displayNoQuotes();
        document.getElementById(sectionToOpen).classList.add('open');
      }, 750);
    } else {
      this.props.displayNoQuotes();
      document.getElementById(sectionToOpen).classList.add('open');
    }
  }         

  showPostSection() {
    // const inputFields = ['work', 'act', 'scene', 'quote', 'tags'];
    // for(let field of inputFields) {
    //   document.getElementById(field).value = 'woohoo';
    //   document.getElementById(field).classList.remove('field-blank');
    //   console.log(field + ' ' + document.getElementById(field).value);
    //   document.getElementById(`help-${field}`).textContent = '';
    // }
    this.toggleSections('quote-post-container','quote-search-container','quote-display-container');
  }
  
  showSearchSection() {
    this.toggleSections('quote-search-container','quote-post-container','quote-display-container'); 
  }

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
  