/*
 * Shakespeare Quote App
 * Quote schema
 */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create quote schema & model
const QuoteSchema = new Schema({
  work: {
    type: String,
    required: [true, "Work (Play, Sonnet etc) field is required"]
  },
  act: {
    type: String
  },
  scene: {
    type: String
  },
  quote: {
    type: String,
    required: [true, "Quote is required"]
  },
  tags: {
    type: Array,
    required: [true, "Tags are required"]
  }
});

// 'quote' collection
const Quote = mongoose.model('quote', QuoteSchema);
module.exports = Quote;
