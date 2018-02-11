/*
 * Shakespeare Quote App
 * Front-end React form to search and display data
 */


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonForm from './ButtonForm';
import ButtonDisplay from './ButtonDisplay';

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

  displayTags(tags) {
    const tagButtons = tags.map((tag, index) => {
      return (<span key={index} className="tag">{tag}</span>);
    });
    console.log(tagButtons);
    return tagButtons;
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
      var quotes = this.state.quotes;
      quotes = quotes.map((quoteQ, index) => {
          const act = quoteQ.act === "" ? "" : `(Act ${quoteQ.act}`;
          const scene = quoteQ.scene === "" ? "" : ` Scene ${quoteQ.act})`;
          return(
              <li key={index}>
                <span className="quote">"{quoteQ.quote}"</span>
                <span className="work">{quoteQ.work}</span>
                <span className="act">{act}</span>
                <span className="scene">{scene}</span>
                <span className="tags">Tags: {this.displayTags(quoteQ.tags)}</span>
              </li>
          )
      });
      return(
          <div id="quote-search-container">
              <form id="search" onSubmit={this.handleSubmit}>
                  <label>Enter search tags, separated by a comma</label>
                  <input type="text" ref="keywords" placeholder="courage, family" onChange={this.handleChange} value={this.state.tags} required  />
                  <ButtonForm type="Submit" label="Find Quotes" />
              </form>
              <hr />
              <ButtonDisplay label="Display All" className="button-display-all" displayAllQuotes={this.displayAll} />
              <ul>{quotes}</ul>
          </div>
      );
  }
}