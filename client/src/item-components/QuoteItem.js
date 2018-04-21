/*
 * Shakespeare Quote App
 * Front-end React Component: Quote Item
 * Renders each individual quote
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  render(){
    const act = this.props.act === '' ? '' : `(Act ${this.props.act}`;
    const scene = this.props.scene === '' ? '' : ` Scene ${this.props.scene})`;
    const tweet = encodeURIComponent(`"${this.props.quote}"`) + encodeURI(` - ${this.props.work} (Act ${this.props.act}, Sc ${this.props.scene})`);
    const tweetURL = `https://twitter.com/intent/tweet?text=${tweet}&hashtags=ShakespeareSunday`;
    return(
      <li className="quote-box" id={this.props.objId}>
        <span className='delete-tick' onClick={this.handleDelete.bind(this, this.props.item, this.props.objId)}>X</span>
        <span className='quote quote-span'>&quot;{this.props.quote}&quot;</span>
        <span className='work quote-span'>{this.props.work}</span>
        <span className='act quote-span'>{act}</span>
        <span className='scene quote-span'>{scene}</span>    
        <span className='tags quote-span'>Tags: {this.displayTags(this.props.tags)}
        
          <span className='tweet'>
            <a className='twitter-share-button' href={tweetURL}>Tweet</a>
          </span>

        </span>   
           
        
      </li>
    );
  }
}

QuoteItem.propTypes = {
  objId: PropTypes.string,
  work: PropTypes.string,
  act: PropTypes.string,
  scene: PropTypes.string,
  quote: PropTypes.string,
  tags: PropTypes.array,
  item: PropTypes.number,
  passTagSelected: PropTypes.func,
  deleteQuote: PropTypes.func
};

export default QuoteItem;

