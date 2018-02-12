/*
 * Shakespeare Quote App
 * Front-end React component to display a list of quotes
 */

import React, { Component } from 'react';
import QuoteItem from './QuoteItem';
require('./Quote.css');

export default class QuoteList extends Component {
  constructor(props){
  super(props);  
  }

  render(){
    console.log(this.props.quotes);
    return this.props.quotes.map((quoteQ, index) => {
      console.log(index);
      return(
          <QuoteItem key={index} quote={quoteQ.quote} work={quoteQ.work} act={quoteQ.act} scene={quoteQ.scene} tags={quoteQ.tags} />
      )
    });
  }
}

