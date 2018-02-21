/*
 * Shakespeare Quote App
 * Front-end React Component: Display Quote
 * Option to:
 *  - displays all quotes
 *  - display quotes that match certain keywords
 */


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonForm from '../button-components/ButtonForm';
import ButtonDisplay from '../button-components/ButtonDisplay';
import QuoteList from './QuoteList';
require('./DisplayQuote.css');

export default class DisplayQuote extends Component {

  constructor(props){
    super(props);
    this.state = {
      tags: "",
      quotes: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayAll = this.displayAll.bind(this);
    this.showSection = this.showSection.bind(this);
  }

  handleChange(event) {
    this.setState({tags: event.target.value});
  }

  handleSubmit(event) {
    var tags = this.state.tags.toLowerCase();
    fetch('/api/quotes?tags=' + tags)
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      this.setState({
        quotes: json
      });
    });
    event.preventDefault();
  }

  // display all quotes in the database
  displayAll(event){
    console.log('stuff');
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

  showSection(event) {
    console.log(document.getElementById('search'));
    document.getElementById('search').classList.toggle('open');
  }

  render(){
      return(
          <div id="quote-search-container">
              <h2 onClick={this.showSection}>Search for a Quote</h2>
              <form className="" id="search" onSubmit={this.handleSubmit}>
                  <label>Enter search tags, separated by a comma</label>
                  <input type="text" ref="keywords" placeholder="courage, family" onChange={this.handleChange} value={this.state.tags} required  />
                  <ButtonForm type="Submit" label="Find Quotes" />
              </form>
              <hr />
              <ButtonDisplay label="Display All" className="button-display-all" displayAllQuotes={this.displayAll} />
              <ul><QuoteList quotes={this.state.quotes} /></ul>
          </div>
      );
  }
}