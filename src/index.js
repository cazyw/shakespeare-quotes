import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DisplayQuote from './quote-components/DisplayQuote';
import PostQuote from './quote-components/PostQuote';

export default class Home extends Component {
  render(){
    return (
      <div className="quote-body">
        <PostQuote />
        <hr />
        <DisplayQuote />
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('quotes'));

