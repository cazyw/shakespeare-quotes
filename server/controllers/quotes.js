const { Quote } = require('../../models/quote');

function retrieveQuotes(req, res) {
  if(!req.query.tags){
    Quote.find({})
      .then((quote) => {
        res.send(quote);
      });
  } else {
    const selectedTags = (req.query.tags.split(' ').map(item => item.trim()).map(item => new RegExp(item, 'i')));
    Quote.find({
      tags: { $in: selectedTags }
    })
      .then((quote) => {
        res.send(quote);
      });
  }
}

module.exports = {
  retrieveQuotes
};