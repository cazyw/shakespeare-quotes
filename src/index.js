import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchQuote from './quote-components/SearchQuote';
import PostQuote from './quote-components/PostQuote';
import Header from './Header';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        <Header />
        <h1 className="title">Speaking Shakespeare</h1>
        <h2 className="sub-title">A collection of Shakespeare quotes for <a href="https://twitter.com/hashtag/ShakespeareSunday?src=hash" target="_blank" alt="Shakespeare Sunday hashtag on Twitter">#ShakespeareSunday</a></h2>
        <div className="quote-body">
          <PostQuote />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('quotes'));

