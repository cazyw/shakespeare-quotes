const { Quote } = require('../../models/quote');

const collateTags = (tags) => {
  return tags.split(' ')
    .map(tag => tag.trim())
    .map(tag => new RegExp(tag, 'i'));
};

const displayAllQuotes = (res) => {
  Quote.find({})
    .then((quote) => res.send(quote));
};

const displaySelectedQuotes = (res, selectedTags) => {
  Quote.find({ tags: { $in: selectedTags } })
    .then((quote) => res.send(quote));
};

function retrieveQuotes(req, res) {
  if(!req.query.tags){
    displayAllQuotes(res);
  } else {
    const selectedTags = collateTags(req.query.tags);
    displaySelectedQuotes(res, selectedTags);
  }
}

function postQuote(req, res, next) {
  // save new instance of a quote (returns a promise)
  Quote.create(req.body)
    .then((quote) => {
      res.send(quote);
    })
    .catch(next); // passes error to app.js
}

function updateQuote(req, res, next) {
  Quote.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
      Quote.findOne({_id: req.params.id})
        .then((quote) => {
          res.send(quote);
        });
    })
    .catch(next); // passes error to app.js
}

function deleteQuote(req, res, next) {
  Quote.findByIdAndRemove({
    _id: req.params.id
  })
    .then((quote) => {
      res.send(quote);
    })
    .catch(next); // passes error to app.js
}

module.exports = {
  collateTags,
  displayAllQuotes,
  displaySelectedQuotes,
  retrieveQuotes,
  postQuote,
  updateQuote,
  deleteQuote
};