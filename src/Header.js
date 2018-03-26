import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchQuote from './quote-components/SearchQuote';
import PostQuote from './quote-components/PostQuote';
import DisplayQuotes from './quote-components/DisplayQuotes';

export default class Header extends Component {
  constructor(props){
    super(props);
    this.showSection = this.showSection.bind(this);
  }

  showSection() {
    document.getElementById('post-quote').classList.toggle('open');
  }

  render(){
    return (
      <header>
        <nav className="navbar navbar-default navbar-expand" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                <span className="glyphicon glyphicon glyphicon glyphicon-tower"></span>
                    Shakespeare
              </a>
              <ul className="nav navbar-nav pull-right">
                <li onClick={this.showSection}><a>Add Quote</a></li>
                <li><a href="/">Search</a></li>
                <li><a href="/">All</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

// ReactDOM.render(<Header />, document.getElementById('header'));

