import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DisplayQuote from './DisplayQuote';
import PostQuote from './PostQuote';

export default class Home extends Component {
  render(){
    return (
      <div className="quote-body">
        <PostQuote />
        <DisplayQuote />
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('quotes'));

