import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchQuote from './page-components/SearchQuote';
import PostQuote from './page-components/PostQuote';
import Header from './page-components/Header';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: []
    };
    this.displayAll = this.displayAll.bind(this);
    this.toggleSections = this.toggleSections.bind(this);
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
  displayAll(){
    fetch('/api/quotes/')
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        this.toggleSections('page-display-container', 'post-quote','search');
        this.setState({
          quotes: json
        });
      });
  }

  render(){
    return (
      <div>
        <Header displayAllQuotes={this.displayAll} />
        <h1 className="title">Speaking Shakespeare</h1>
        <h2 className="sub-title">A collection of Shakespeare quotes for <a href="https://twitter.com/hashtag/ShakespeareSunday?src=hash" target="_blank" alt="Shakespeare Sunday hashtag on Twitter">#ShakespeareSunday</a></h2>
        <div className="page-body">
          <PostQuote />
          <SearchQuote quotes={this.state.quotes} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById('quotes'));

