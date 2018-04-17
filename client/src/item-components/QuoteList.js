/*
 * Shakespeare Quote App
 * Front-end React Component: Quote List
 * Container for the list of quotes to be displayed
 */


import React, { Component } from 'react';
import QuoteItem from './QuoteItem';
import PropTypes from 'prop-types';
import { openElement, closeElement } from '../utils/helperFunctions';

class QuoteList extends Component {
  constructor(props){
    super(props);
    this.state = {
      quotes: []
    };
    this.deleteQuote = this.deleteQuote.bind(this);
    this.updateQuoteListFromTag = this.updateQuoteListFromTag.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ quotes: newProps.quotes });
  }

  updateQuoteListFromTag(tag) {
    fetch(`/api/quotes?tags=${encodeURI(tag)}`)
      .then(data => {
        return data.json();
      })
      .then(json => {
        closeElement('quote-display-container');
        setTimeout(() => {
          openElement('quote-display-container');
          this.setState({
            quotes: json
          });
        }, 750);
      });
  }

  deleteQuote(key) {
    let updatedQuotes = [...this.state.quotes];
    updatedQuotes.splice(key, 1);
    this.setState({ quotes: updatedQuotes });
  }

  render(){
    return this.state.quotes.map((quoteQ, index) => {
      return(
        <QuoteItem key={index} quote={quoteQ.quote} work={quoteQ.work} act={quoteQ.act} scene={quoteQ.scene} tags={quoteQ.tags} passTagSelected={this.updateQuoteListFromTag} deleteQuote={this.deleteQuote} item={index} />
      );
    });
  }
}

QuoteList.propTypes = {
  quotes: PropTypes.array
};

export default QuoteList;
