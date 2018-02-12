import React, { Component } from 'react';
require('./Button.css');

export default class Button extends Component {
    parentFunction() {
      this.props.displayAllQuotes();
    }
    render() {
        return <button className={this.props.className} onClick={this.parentFunction.bind(this)}>{this.props.label}</button>;
    }
}

