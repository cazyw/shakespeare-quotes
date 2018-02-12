/*
 * Shakespeare Quote App
 * Quote schema
 */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// validator, either both Act and Scene must be blank (e.g. for sonnets)
// or they must both be filled out

function hasActOrScene(){ 
  return (this.act != "" || this.scene != "");
};

// create quote schema & model
const QuoteSchema = new Schema({
  
  work: {
    type: String,
    required: [true, "Work (Play, Sonnet etc) field is required"]
  },
  act: {
    type: String,
    required: [hasActOrScene, "Both Act and Scene must be blank or completed"]
  },
  scene: {
    type: String,
    required: [hasActOrScene, "Both Act and Scene must be blank or completed"]
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
