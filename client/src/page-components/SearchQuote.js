/*
 * Shakespeare Quote App
 * Front-end React Component: Search Quote
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ButtonForm from '../item-components/ButtonForm';
import DisplayQuotes from './DisplayQuotes';
import {FormControl, ControlLabel, FormGroup} from 'react-bootstrap';
import {searchQuotes} from '../utils/apiCalls';
import {closeElements} from './../utils/updateDisplay';
import {arraysMatch} from './../utils/helperFunctions';
import './SearchQuote.css';

export default class SearchQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: '',
      quotes: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetTags = this.resetTags.bind(this);
    this.searchResults = this.searchResults.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!arraysMatch(newProps.quotes, this.state.quotes)) this.setState({quotes: newProps.quotes});
  }

  handleChange(event) {
    this.setState({tags: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    closeElements('pagination-container-top', 'pagination-container-bottom', 'quote-display-container');
    var tags = this.state.tags.toLowerCase();
    searchQuotes(tags, this.searchResults, this.resetTags);
  }

  searchResults(quotes) {
    this.setState({quotes});
  }

  resetTags() {
    this.setState({tags: ''});
  }

  render() {
    return (
      <div className="homepage">
        <form className="" id="quote-search-container" onSubmit={this.handleSubmit}>
          <FormGroup controlId="formBasicText" className="form-inner">
            <ControlLabel>Enter search tags, separated by a space (e.g. courage love family)</ControlLabel>
            <FormControl
              type="text"
              placeholder="courage family battle"
              onChange={this.handleChange}
              value={this.state.tags}
              required
            />
            <FormControl.Feedback />
            <ButtonForm type="submit" label="Find Quotes" className="form-button search-button" />
          </FormGroup>
        </form>
        <div id="searchResultMessage" />
        <DisplayQuotes quotes={this.state.quotes} editQuote={this.props.editQuote} />
      </div>
    );
  }
}

SearchQuote.propTypes = {
  editQuote: PropTypes.func,
  quotes: PropTypes.array,
};
