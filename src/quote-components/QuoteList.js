/*
 * Shakespeare Quote App
 * Front-end React Component: Quote List
 * Container for the list of quotes to be displayed
 */


import React, { Component } from 'react';
import QuoteItem from './QuoteItem';
require('./Quote.css');

export default class QuoteList extends Component {
  constructor(props){
    super(props);  
  }

  render(){
    return this.props.quotes.map((quoteQ, index) => {
      return(
        <QuoteItem key={index} quote={quoteQ.quote} work={quoteQ.work} act={quoteQ.act} scene={quoteQ.scene} tags={quoteQ.tags} />
      );
    });
  }
}
