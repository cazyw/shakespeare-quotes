/*
 * Shakespeare Quote App
 * Front-end React Component: Button Form
 *  - form button
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
require('./Button.css');

class ButtonForm extends Component {
  render() {
    return <button type={this.props.type} className={this.props.className}>{this.props.label}</button>;
  }
}

ButtonForm.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string
};

module.exports = ButtonForm;