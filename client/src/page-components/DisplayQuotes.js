/*
 * Shakespeare Quote App
 * Front-end React Component: Display Quotes
 * Option to:
 *  - displays all quotes
 *  - display quotes that match certain keywords
 */

import React, { Component } from 'react';
import QuoteList from '../item-components/QuoteList';
import './DisplayQuotes.css';

export default class DisplayQuotes extends Component {

  constructor(props){
    super(props);
    this.state = {
      quotes: []
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ quotes: newProps.quotes });
  }

  render() {
    return(
      <div className="homepage" id="quote-display-container">
        <ul><QuoteList quotes={this.state.quotes} /></ul>
      </div>
    );
  }
}