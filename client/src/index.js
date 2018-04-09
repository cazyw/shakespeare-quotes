import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchQuote from './page-components/SearchQuote';
import PostQuote from './page-components/PostQuote';
import Header from './page-components/Header';
import { toggleSections, openElement, closeElement } from './utils/helperFunctions';
import './styles.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: []
    };
  }

  componentWillMount() {
    fetch('/api/quotes/random')
      .then(data => {
        return data.json();
      })
      .then(json => {
        toggleSections('quote-display-container', 'quote-post-container','quote-search-container');
        this.setState({
          quotes: json
        });
      });
  }

  // display all quotes in the database
  displayAll = () => {
    fetch('/api/quotes/')
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        const timeOut = document.getElementById('quote-display-container').classList.contains('open') ? 750 : 0;
        closeElement('quote-display-container');
        setTimeout(() => {
          toggleSections('quote-display-container', 'quote-post-container','quote-search-container');
          this.setState({
            quotes: json
          });
        }, timeOut);
      });
  }

  // display no quotes
  displayNone = () => {
    this.setState({
      quotes: []
    });
  }
  
  // display selected quotes
  displaySelected = (quotes) => {
    this.setState({
      quotes: [quotes]
    });
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

