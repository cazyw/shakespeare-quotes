/*
 * Shakespeare Quote App
 * Front-end React Component: Button Form
 *  - form button
 */

import React, { Component } from 'react';
require('./Button.css');

export default class Button extends Component {
  render() {
    return <button type={this.props.type} className={this.props.className}>{this.props.label}</button>;
  }
}
