/*
 * Shakespeare Quote App
 * Front-end React Component: Display Quotes
 * Option to:
 *  - displays all quotes
 *  - display quotes that match certain keywords
 */
import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import QuoteList from '../item-components/QuoteList';
import './DisplayQuotes.css';
import { toggleSections } from '../utils/updateDisplay';
import { TIMEOUT } from './../utils/constants';

export default class DisplayQuotes extends Component {
  constructor(props){
    super(props);
    this.state = {
      quotes: [],
      subQuotes: [],
      pageCount: 0,
      offset: 0,
      perPage: 10
    };

    this.quoteSubset = this.quoteSubset.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      quotes: newProps.quotes,
      pageCount: Math.ceil(newProps.quotes.length / this.state.perPage)
    }, () => {
      this.quoteSubset();
    });

  }

  quoteSubset() {
    const startQuote = this.state.offset;
    const endQuote = startQuote + 10 > this.state.quotes.length ? this.state.quotes.length : startQuote + 10 ;
    toggleSections('quote-display-container', 'quote-display-container');
    setTimeout(() => {
      this.setState({
        subQuotes: this.state.quotes.slice(startQuote, endQuote)
      });
    }, TIMEOUT);
  }

  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.state.perPage);
    this.setState({ offset: offset }, () => {
      this.quoteSubset();
    });
  }

  render() {
    if(this.state.quotes.length < 11) {
      return(
        <div className="homepage" id="quote-display-container">
          <ul><QuoteList quotes={this.state.quotes} editQuote={this.props.editQuote} /></ul>
        </div>
      );
    }
    return(
      <div>
        <div className='pagination-block'>
          <ReactPaginate previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={<a href="">...</a>}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'} />
        </div>
        <div className="homepage" id="quote-display-container">
          <ul><QuoteList quotes={this.state.subQuotes} editQuote={this.props.editQuote} /></ul>
        </div>
      </div>
    );
  }
}

DisplayQuotes.propTypes = {
  editQuote: PropTypes.func
};
