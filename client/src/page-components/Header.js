import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toggleSections } from '../utils/updateDisplay';
import { resetWarnings } from '../utils/errorHandling';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './Header.css';
import { TIMEOUT } from './../utils/constants';

export default class Header extends Component {
  constructor(props){
    super(props);
    this.displayAll = this.displayAll.bind(this);
    this.displayNone = this.displayNone.bind(this);
    this.showPostSection = this.showPostSection.bind(this);
    this.showSearchSection = this.showSearchSection.bind(this);
  }
  displayAll() {
    this.props.displayAllQuotes();
  }

  displayNone() {
    this.props.displayNoQuotes();
  }

  showPostSection() {
    resetWarnings('post');
    document.getElementById('searchResultMessage').textContent = '';
    toggleSections('quote-post-container','quote-search-container','quote-display-container', 'quote-update-container', 'pagination-container-top', 'pagination-container-bottom');
    setTimeout(() => {
      this.displayNone();
    }, TIMEOUT);
  }

  showSearchSection() {
    toggleSections('quote-search-container','quote-post-container','quote-display-container', 'quote-update-container', 'pagination-container-top', 'pagination-container-bottom');
    setTimeout(() => {
      this.displayNone();
    }, TIMEOUT);
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
              <NavItem eventKey={1} onClick={this.showPostSection}>Add Quote</NavItem>
              <NavItem eventKey={2} onClick={this.showSearchSection}>Search</NavItem>
              <NavItem eventKey={3} onClick={this.displayAll}>All</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

Header.propTypes = {
  displayAllQuotes: PropTypes.func,
  displayNoQuotes: PropTypes.func
};
