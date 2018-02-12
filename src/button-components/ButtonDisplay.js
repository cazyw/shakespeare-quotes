/*
 * Shakespeare Quote App
 * Front-end React Component: Button Form
 *  - button to display all quotes
 */

import React, { Component } from 'react';
require('./Button.css');

export default class ButtonDisplay extends Component {
    parentFunction() {
      this.props.displayAllQuotes();
    }
    render() {
        return <button className={this.props.className} onClick={this.parentFunction.bind(this)}>{this.props.label}</button>;
    }
}

