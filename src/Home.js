/*
 * Shakespeare Quote App
 * Front-end React
 */


var React = require('react');
var ReactDOM = require('react-dom');
var Button = require('./Button');

class Home extends React.Component {
// var Quotes = React.createClass({

  constructor(props){
    super(props);
    this.state = {
      tags: "",
      quotes: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render(){
      var quotes = this.state.quotes;
      quotes = quotes.map((quoteQ, index) => {
          return(
              <li key={index}>
                <span className="quote">"{quoteQ.quote}"</span>
                <span className="work">{quoteQ.work}</span>
                <span className="act">(Act {quoteQ.act} </span>
                <span className="scene"> Scene {quoteQ.scene})</span>
                <span className="tags">Tags: {this.displayTags(quoteQ.tags)}</span>
              </li>
          )
      });
      return(
          <div id="quote-container">
              <form id="search" onSubmit={this.handleSubmit}>
                  <label>Enter search tags, separated by a comma</label>
                  <input type="text" ref="keywords" placeholder="courage, family" onChange={this.handleChange} value={this.state.tags} required  />
                  <Button label="Find Quotes" />
                  
              </form>
              <ul>{quotes}</ul>
          </div>
      );
  }

  //<input type="Submit" defaultValue="Find Quotes" />

  displayTags(tags) {
    const tagButtons = tags.map((tag, index) => {
      return (<span key={index} className="tag">{tag}</span>);
    });
    console.log(tagButtons);
    return tagButtons;
  }

  handleChange(event) {
    this.setState({tags: event.target.value});
  }

  handleSubmit(event) {
    var tags = this.state.tags;
    fetch('/api/quotes?tags=' + tags)
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      this.setState({
        quotes: json
      });
    });
    event.preventDefault();
  }
}
ReactDOM.render(<Home />, document.getElementById('quotes'));