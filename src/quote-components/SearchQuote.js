/*
 * Shakespeare Quote App
 * Front-end React Component: Search Quote
 */


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonForm from '../button-components/ButtonForm';
import ButtonDisplay from '../button-components/ButtonDisplay';
import DisplayQuotes from './DisplayQuotes';
require('./Forms.css');

export default class SearchQuote extends Component {

  constructor(props){
    super(props);
    this.state = {
      tags: "",
      quotes: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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



  showSection(event) {
    document.getElementById('search').classList.toggle('open');
  }

  render(){
    return(
      <div id="quote-search-container">
        <div className="homepage">
          <h2 onClick={this.showSection}>Search for a Quote</h2>
          <form className="" id="search" onSubmit={this.handleSubmit}>
            <label>Enter search tags, separated by a comma</label>
            <input type="text" ref="keywords" placeholder="courage, family" onChange={this.handleChange} value={this.state.tags} required  />
            <ButtonForm type="Submit" label="Find Quotes" />
          </form>
        </div>
        <DisplayQuotes quotes={this.state.quotes} />
      </div>
    );
  }
}