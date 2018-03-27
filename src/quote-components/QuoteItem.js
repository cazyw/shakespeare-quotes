/*
 * Shakespeare Quote App
 * Front-end React Component: Quote Item
 * Renders each individual quote
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';

class QuoteItem extends Component {
  constructor(props){
    super(props);  
  }

  displayTags(tags) {
    const tagButtons = tags.map((tag, index) => {
      return (<span key={index} className='tag'>{tag}</span>);
    });
    return tagButtons;
  }

  render(){
    const act = this.props.act === '' ? '' : `(Act ${this.props.act}`;
    const scene = this.props.scene === '' ? '' : ` Scene ${this.props.act})`;
    return(
      <li className="quote-box">
        <span className='quote quote-span'>"{this.props.quote}"</span>
        <span className='work quote-span'>{this.props.work}</span>
        <span className='act quote-span'>{act}</span>
        <span className='scene quote-span'>{scene}</span>    
        <span className='tags quote-span'>Tags: {this.displayTags(this.props.tags)}</span>      
      </li>
    );
  }
}

QuoteItem.propTypes = {
  work: PropTypes.string,
  act: PropTypes.string,
  scene: PropTypes.string,
  quote: PropTypes.string,
  tags: PropTypes.array,
};

module.exports = QuoteItem;

