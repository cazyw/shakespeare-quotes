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
import { toggleSections, openElement } from '../utils/updateDisplay';
import './DisplayQuotes.css';
import { TIMEOUT } from './../utils/constants';

export default class DisplayQuotes extends Component {
  constructor(props){
    super(props);
    this.state = {
      quotes: [],
      subQuotes: [],
      pageCount: 0,
      offset: 0,
      perPage: 7,
      selected: null
    };

    this.quoteSubset = this.quoteSubset.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      offset: 0,
      quotes: newProps.quotes,
      pageCount: Math.ceil(newProps.quotes.length / this.state.perPage)
    }, () => {
      this.quoteSubset();
    });
    toggleSections('pagination-container-top', 'pagination-container-top');
    toggleSections('pagination-container-bottom', 'pagination-container-bottom');
  }

  quoteSubset() {
    const startQuote = this.state.offset;
    const endQuote = startQuote + this.state.perPage > this.state.quotes.length ? this.state.quotes.length : startQuote + this.state.perPage ;

    this.setState({
      subQuotes: this.state.quotes.slice(startQuote, endQuote)
    });

    setTimeout(() => {
      openElement('quote-display-container');
    }, TIMEOUT);
  }

  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.state.perPage);
    this.setState({ offset: offset, selected }, () => {
      this.quoteSubset();
    });
    window.scrollTo(0, 0);
  }

  render() {
    if(this.state.quotes.length <= this.state.perPage) {
      return(
        <div className="homepage" id="quote-display-container">
          <ul><QuoteList quotes={this.state.quotes} editQuote={this.props.editQuote} /></ul>
        </div>
      );
    }
    openElement('pagination-container-top');
    openElement('pagination-container-bottom');
    return(
      <div>
        <div className="pagination-container" id="pagination-container-top">
          <ReactPaginate previousLabel={'prev'}
            nextLabel={'next'}
            breakLabel={<a href="">...</a>}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            forcePage={this.state.selected} />
        </div>
        <div className="homepage" id="quote-display-container">
          <ul><QuoteList quotes={this.state.subQuotes} editQuote={this.props.editQuote} /></ul>
        </div>
        <div className="pagination-container" id="pagination-container-bottom">
          <ReactPaginate previousLabel={'prev'}
            nextLabel={'next'}
            breakLabel={<a href="">...</a>}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            forcePage={this.state.selected} />
        </div>
      </div>
    );
  }
}

DisplayQuotes.propTypes = {
  editQuote: PropTypes.func
};
