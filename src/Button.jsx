const React = require('react');
require('./Button.css');

function Button ({ label }) {
    return <button type="Submit">{label}</button>;
}

module.exports = Button;