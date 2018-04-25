/*
 * Shakespeare Quote App
 * Front-end React Component: Quote Item
 * Renders each individual quote
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { tweetUrl } from '../utils/helperFunctions';
import { resetWarnings } from '../utils/errorHandling';
import './QuoteItem.css';

class QuoteItem extends Component {
  handleClick(tag) {
    this.props.passTagSelected(tag);
  }

  displayTags(tags) {
    const tagButtons = tags.map((tag, index) => {
      return (<span key={index} className='tag' onClick={this.handleClick.bind(this, tag)}>{decodeURI(tag)}</span>);
    });
    return tagButtons;
  }

  handleDelete(key, objId) {
    this.props.deleteQuote(key, objId);
  }

  handleEdit(quote) {
    resetWarnings('update');
    this.props.editQuote(quote);
  }

  render(){
    const act = this.props.act === '' ? '' : `(Act ${this.props.act}`;
    const scene = this.props.scene === '' ? '' : ` Scene ${this.props.scene})`;
    return(
      <li className="quote-box" id={this.props._id}>

        <span className='quote quote-span'>&quot;{this.props.quote}&quot;</span>
        <span className='work quote-span'>{this.props.work}</span>
        <span className='act quote-span'>{act}</span>
        <span className='scene quote-span'>{scene}</span>    
        <span className='tags quote-span'>Tags: {this.displayTags(this.props.tags)}</span> 
        <div className='controls'>
          <span className='tweet'>
            <a className='tweet-button' href={tweetUrl(this.props.quote, this.props.work, this.props.act, this.props.scene)}><img width='25px' height='25px' src='./Twitter_Logo_WhiteOnImage.png' alt='twitter logo' /></a>
          </span>
          <span className='update-tick' onClick={this.handleEdit.bind(this, this.props)}> Edit </span>
          <span className='delete-tick' onClick={this.handleDelete.bind(this, this.props.item, this.props._id)}>X</span>
        </div>
      </li>
    );
  }
}

QuoteItem.propTypes = {
  _id: PropTypes.string,
  work: PropTypes.string,
  act: PropTypes.string,
  scene: PropTypes.string,
  quote: PropTypes.string,
  tags: PropTypes.array,
  item: PropTypes.number,
  passTagSelected: PropTypes.func,
  deleteQuote: PropTypes.func,
  editQuote: PropTypes.func
};

export default QuoteItem;

