/*
 * Shakespeare Quote App
 * Front-end React Component: Quote Item
 * Renders each individual quote
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';
require('./Quote.css');

QuoteItem.propTypes = {
  work: PropTypes.string,
  act: PropTypes.string,
  scene: PropTypes.string,
  quote: PropTypes.string,
  tags: PropTypes.array,
};

export default class QuoteItem extends Component {
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
      <li>
        <span className='quote'>"{this.props.quote}"</span>
        <span className='work'>{this.props.work}</span>
        <span className='act'>{act}</span>
        <span className='scene'>{scene}</span>    
        <span className='tags'>Tags: {this.displayTags(this.props.tags)}</span>      
      </li>
    );
  }
}

