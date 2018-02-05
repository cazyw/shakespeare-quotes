const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create quote schema & model
const QuoteSchema = new Schema({
  work: {
    type: String,
    required: [true, "Work (Play, Sonnet etc) field is required"]
  },
  act: {
    type: Number
  },
  scene: {
    type: Number
  },
  quote: {
    type: String,
    required: [true, "Quote is required"]
  },
  tags: {
    type: Array
  }
});

// 'quote' collection
const Quote = mongoose.model('quote', QuoteSchema);
module.exports = Quote;
