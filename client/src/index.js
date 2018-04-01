import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchQuote from './page-components/SearchQuote';
import PostQuote from './page-components/PostQuote';
import Header from './page-components/Header';
import './styles.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: []
    };
    this.displayAll = this.displayAll.bind(this);
    this.toggleSections = this.toggleSections.bind(this);
  }

  componentWillMount() {
    fetch('/api/quotes/random')
      .then(data => {
        return data.json();
      })
      .then(json => {
        this.toggleSections('quote-display-container', 'quote-post-container','quote-search-container');
        this.setState({
          quotes: json
        });
      });
  }

  toggleSections(sectionToOpen, sectionToClose1, sectionToClose2){
    if (document.getElementById(sectionToClose1).classList.contains('open') || 
        document.getElementById(sectionToClose2).classList.contains('open')){
      document.getElementById(sectionToClose1).classList.remove('open');
      document.getElementById(sectionToClose2).classList.remove('open');
      setTimeout(() => {
        document.getElementById(sectionToOpen).classList.add('open');
      }, 750);
    } else {
      document.getElementById(sectionToOpen).classList.add('open');
    }
  }

  // display all quotes in the database
  displayAll = () => {
    fetch('/api/quotes/')
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        document.getElementById('quote-display-container').classList.remove('open');
        setTimeout(() => {
          this.toggleSections('quote-display-container', 'quote-post-container','quote-search-container');
          this.setState({
            quotes: json
          });
        }, 750);
      });
  }

  // display no quotes
  displayNone = () => {
    this.setState({
      quotes: []
    });
  }
  
  // display no quotes
  displaySelected = (quotes) => {
    this.setState({
      quotes: [quotes]
    });
    document.getElementById('quote-display-container').classList.add('open');
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

