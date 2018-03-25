/*
 * Shakespeare Quote App
 * Quote schema
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// validator, either both Act and Scene must be blank (e.g. for sonnets)
// or they must both be filled out

function hasActOrScene() { 
  return (this.act != '' || this.scene != '');
}

function hasTags(val) {
  return val.length > 0;
}

// blank or up to three digits
function isInteger(val){
  return /^(?:|[1-9][0-9]{0,2})$/.test(val);
}

// create quote schema & model
const QuoteSchema = new Schema({
  
  work: {
    type: String,
    required: [true, 'Work (Play, Sonnet etc) field is required']
  },
  act: {
    type: String,
    required: [hasActOrScene, 'Both Act and Scene must be blank or completed'],
    validate: [isInteger, 'The Act must be blank or a numerical value']
  },
  scene: {
    type: String,
    required: [hasActOrScene, 'Both Act and Scene must be blank or completed'],
    validate: [isInteger, 'The Scene must be blank or a numerical value']
  },
  quote: {
    type: String,
    required: [true, 'Quote is required']
  },
  tags: {
    type: [{
      type: String,
      lowercase: true
    }],
    required: [true, 'Tags are required'],
    validate: [hasTags, 'Tags are required!']
  }
});


// 'quote' collection

const Quote = mongoose.model('quote', QuoteSchema);
module.exports = {Quote};
