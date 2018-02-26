/*
 * Shakespeare Quote App
 * Front-end React Component: Button Form
 *  - button to display all quotes
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
require('./Button.css');

ButtonDisplay.propTypes = {
  className: PropTypes.string,
  displayAllQuotes: PropTypes.func,
  label: PropTypes.string
};

export default class ButtonDisplay extends Component {
  parentFunction() {
    this.props.displayAllQuotes();
  }
  render() {
    return <button className={this.props.className} onClick={this.parentFunction.bind(this)}>{this.props.label}</button>;
  }
}

