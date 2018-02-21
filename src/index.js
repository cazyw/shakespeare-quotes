import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchQuote from './quote-components/SearchQuote';
import PostQuote from './quote-components/PostQuote';

export default class Home extends Component {
  render(){
    return (
      <div className="quote-body">
        <PostQuote />
        <SearchQuote />
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('quotes'));

