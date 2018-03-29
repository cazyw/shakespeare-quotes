/*
 * Shakespeare Quote App
 * Front-end React Component: Search Quote
 */


import React, { Component } from 'react';
import ButtonForm from '../item-components/ButtonForm';
import DisplayQuotes from './DisplayQuotes';

export default class SearchQuote extends Component {

  constructor(props){
    super(props);
    this.state = {
      tags: '',
      quotes: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ quotes: newProps.quotes });
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
        document.getElementById('quote-display-container').classList.add('open');
        this.setState({tags: ''});
        this.setState({
          quotes: json
        });
      });
    event.preventDefault();
  }

  render(){
    return(
      <div id="quote-search-container">
        <div className="homepage">
          <form className="" id="search" onSubmit={this.handleSubmit}>
            <div className='form-inner'>
              <label>Enter search tags, separated by a space</label>
              <input type="text" placeholder="courage family battle" onChange={this.handleChange} value={this.state.tags} required  />
              <ButtonForm type="Submit" label="Find Quotes" />
            </div>
          </form>
        </div>
        <DisplayQuotes quotes={this.state.quotes} />
      </div>
    );
  }
}