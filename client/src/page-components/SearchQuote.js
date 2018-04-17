/*
 * Shakespeare Quote App
 * Front-end React Component: Search Quote
 */


import React, { Component } from 'react';
import ButtonForm from '../item-components/ButtonForm';
import DisplayQuotes from './DisplayQuotes';
import { FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import { openElement, closeElement } from '../utils/helperFunctions';
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

        const helpText = json.length === 0 ? 'No matches' : '';
        
        const timeOut = document.getElementById('quote-display-container').classList.contains('open') ? 750 : 0;
        closeElement('quote-display-container');
        setTimeout(() => {
          this.setState({
            quotes: json
          });
          document.getElementById('searchResultMessage').textContent = helpText;
          openElement('quote-display-container');
        }, timeOut);
      });
    event.preventDefault();
  }


  render(){
    return(
      <div className="homepage">
        <form className="" id="quote-search-container" onSubmit={this.handleSubmit}>
          <FormGroup controlId="formBasicText" className="form-inner">
            <ControlLabel>Enter search tags, separated by a space (e.g. courage love family)</ControlLabel>
            <FormControl type="text" placeholder="courage family battle" onChange={this.handleChange} value={this.state.tags} required  />
            <FormControl.Feedback />
            <ButtonForm type="submit" label="Find Quotes" className="form-button search-button" />
          </FormGroup>
        </form>
        <div id="searchResultMessage"></div>
        <DisplayQuotes quotes={this.state.quotes} />
      </div>
    );
  }
}