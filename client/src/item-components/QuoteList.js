/*
 * Shakespeare Quote App
 * Front-end React Component: Quote List
 * Container for the list of quotes to be displayed
 */
import React, { Component } from 'react';
import QuoteItem from './QuoteItem';
import PropTypes from 'prop-types';
import { searchQuotes, deleteQuote } from '../utils/apiCalls';
import { closeElements } from '../utils/updateDisplay';
import { TIMEOUT } from '../utils/constants';

class QuoteList extends Component {
  constructor(props){
    super(props);
    this.state = {
      quotes: []
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.searchByTag = this.searchByTag.bind(this);
    this.displayQuotes = this.displayQuotes.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ quotes: newProps.quotes });
  }

  displayQuotes(quotes) {
    this.setState({ quotes });
  }

  searchByTag(tag) {
    searchQuotes(tag, this.displayQuotes);
  }

  handleDelete(key, objId) {
    let updatedQuoteList = [...this.state.quotes];
    updatedQuoteList.splice(key, 1);
    deleteQuote(objId, this.displayQuotes, updatedQuoteList);
  }

  handleEdit(quote) {
    closeElements('quote-display-container', 'quote-post-container', 'quote-search-container');
    setTimeout(() => {
      this.displayQuotes([]);
      this.props.editQuote(quote);
    }, TIMEOUT);
  }

  render(){
    return this.state.quotes.map((quoteQ, index) => {
      return(
        <QuoteItem objId={quoteQ._id} key={index} quote={quoteQ.quote} work={quoteQ.work} 
          act={quoteQ.act} scene={quoteQ.scene} tags={quoteQ.tags} 
          passTagSelected={this.searchByTag} deleteQuote={this.handleDelete} 
          editQuote={this.handleEdit} clearDisplay={this.displayQuotes} item={index} />
      );
    });
  }
}

QuoteList.propTypes = {
  quotes: PropTypes.array,
  editQuote: PropTypes.func
};

export default QuoteList;
