/*
 * Shakespeare Quote App
 * Front-end React Component: Button Form
 *  - form button
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import './ButtonForm.css';

class ButtonForm extends Component {
  render() {
    return <Button type={this.props.type} className={this.props.className}>{this.props.label}</Button>;
  }
}

ButtonForm.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string
};

export default ButtonForm;
