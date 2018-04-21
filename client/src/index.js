import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchQuote from './page-components/SearchQuote';
import PostQuote from './page-components/PostQuote';
import Header from './page-components/Header';
import { openElement } from './utils/helperFunctions';
import { getRandomQuote, getAllQuotes } from './utils/apiCalls';
import './styles.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: []
    };
    this.displayAll = this.displayAll.bind(this);
    this.displayNone = this.displayNone.bind(this);
    this.displaySelected = this.displaySelected.bind(this);
  }

  componentWillMount() {
    getRandomQuote(this.displaySelected);
  }

  displayAll() {
    document.getElementById('searchResultMessage').textContent = '';
    getAllQuotes(this.displaySelected);
  }

  displayNone() {
    this.setState({ quotes: [] });
  }
  
  displaySelected(quotes) {
    this.setState({ quotes });
    openElement('quote-display-container');
  }

  render(){
    return (
      <div>
        <Header displayAllQuotes={this.displayAll} displayNoQuotes={this.displayNone} />
        <main>
          <h1 className="title">Speaking Shakespeare</h1>
          <h2 className="sub-title">A collection of Shakespeare quotes for <a href="https://twitter.com/hashtag/ShakespeareSunday?src=hash" target="_blank" rel="noopener noreferrer" alt="Shakespeare Sunday hashtag on Twitter">#ShakespeareSunday</a></h2>
          <div className="page-body">
            <PostQuote displaySelectedQuote={this.displaySelected} />
            <SearchQuote quotes={this.state.quotes} />
          </div>
        </main>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('quotes'));

