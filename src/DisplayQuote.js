/*
 * Shakespeare Quote App
 * Front-end React form to search and display data
 */


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonForm from './ButtonForm';
import ButtonDisplay from './ButtonDisplay';
import QuoteList from './QuoteList';

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
  }

  handleChange(event) {
    this.setState({tags: event.target.value});
  }

  handleSubmit(event) {
    var tags = this.state.tags;
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

  render(){
      return(
          <div id="quote-search-container">
              <form id="search" onSubmit={this.handleSubmit}>
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