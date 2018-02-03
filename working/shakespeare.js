var React = require('react');
var ReactDOM = require('react-dom');

class Quotes extends React.Component {
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
                <span className="work">{quoteQ.work}</span>
                <span className="act">Act {quoteQ.act}</span>
                <span className="scene">Scene {quoteQ.scene}</span>
                <span className="quote">{quoteQ.quote}</span>
                <span className="tags">{this.displayTags(quoteQ.tags)}</span>
              </li>
          )
      });
      return(
          <div id="quote-container">
              <form id="search" onSubmit={this.handleSubmit}>
                  <label>Enter search tags, separated by a comma</label>
                  <input type="text" ref="keywords" onChange={this.handleChange} value={this.state.tags} required  />
                  <input type="Submit" placeholder="Find Quotes" />
              </form>
              <ul>{quotes}</ul>
          </div>
      );
  }

  displayTags(tags) {
    return tags.join(',');
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
ReactDOM.render(<Quotes />, document.getElementById('quotes'));