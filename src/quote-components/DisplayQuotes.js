/*
 * Shakespeare Quote App
 * Front-end React Component: Display Quotes
 * Option to:
 *  - displays all quotes
 *  - display quotes that match certain keywords
 */

import React, { Component } from 'react';
import QuoteList from './QuoteList';

export default class DisplayQuotes extends Component {

  constructor(props){
    super(props);
    this.state = {
      quotes: []
    };

    this.displayAll = this.displayAll.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ quotes: newProps.quotes });
  }

  // display all quotes in the database
  displayAll(){
    fetch('/api/quotes/')
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        this.setState({
          quotes: json
        });
      });
  }

  render() {
    return(
      <div className="homepage" id="quote-display-container">
        <h2 onClick={this.displayAll}>Display All</h2>
        <ul><QuoteList quotes={this.state.quotes} /></ul>
      </div>
    );
  }
}