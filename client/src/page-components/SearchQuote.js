/*
 * Shakespeare Quote App
 * Front-end React Component: Search Quote
 */


import React, { Component } from 'react';
import ButtonForm from '../item-components/ButtonForm';
import DisplayQuotes from './DisplayQuotes';
import './SearchQuote.css';

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
        this.setState({tags: ''});
        if(document.getElementById('quote-display-container').classList.contains('open')){
          document.getElementById('quote-display-container').classList.remove('open');
          setTimeout(() => {
            this.setState({
              quotes: json
            });
            document.getElementById('quote-display-container').classList.add('open');
          }, 750);
        } else {
          this.setState({
            quotes: json
          });
          document.getElementById('quote-display-container').classList.add('open');
        }
      });
    event.preventDefault();
  }

  render(){
    return(
      <div className="homepage">
          <form className="" id="quote-search-container" onSubmit={this.handleSubmit}>
            <div className='form-inner'>
              <label>Enter search tags, separated by a space</label>
              <input type="text" placeholder="courage family battle" onChange={this.handleChange} value={this.state.tags} required  />
              <ButtonForm type="Submit" label="Find Quotes" />
            </div>
          </form>
        <DisplayQuotes quotes={this.state.quotes} />
      </div>
    );
  }
}