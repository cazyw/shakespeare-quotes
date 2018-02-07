const React = require('react');
require('./Button.css');

class Button extends React.Component {
  render(){
    return(
      <button type="Submit">{this.props.label}</button>
    );
  }
}

module.exports = Button;