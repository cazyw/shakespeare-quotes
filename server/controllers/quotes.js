const { Quote } = require('../../models/quote');
const pluralize = require('pluralize');

const pluralSingular = (tagArray) => {
  originalSet = new Set([]);
  tagArray.forEach((tag) => {
    originalSet.add(pluralize.plural(tag));
    originalSet.add(pluralize.singular(tag));
  });
  return [...originalSet];
}

const collateTags = (tags) => {
  const tagArray = tags.split(' ').map(tag => tag.trim());
  const expandedTags = pluralSingular(tagArray);
  return expandedTags.map(tag => new RegExp(tag, 'i'));
};

const displayAllQuotes = (res, next) => {
  Quote.find({}).sort( '-created_date' )
    .exec()
    .then(quote => res.send(quote))
    .catch(error => next(error)); // passes error to app.js
};

const displaySelectedQuotes = (res, selectedTags, next) => {
  Quote.find({ tags: { $in: selectedTags } })
    .exec()
    .then(quote => res.send(quote))
    .catch(error => next(error)); // passes error to app.js
};

function retrieveRandomQuote(req, res, next) {
  Quote.aggregate([{ $sample: { size: 1 } }])
    .then(quote => res.send(quote))
    .catch(error => next(error));
}

function retrieveQuotes(req, res, next) {
  if(!req.query.tags){
    displayAllQuotes(res, next);
  } else {
    const selectedTags = collateTags(req.query.tags);
    displaySelectedQuotes(res, selectedTags, next);
  }
}

function postQuote(req, res, next) {
  // save new instance of a quote (returns a promise)
  Quote.create(req.body)
    .then(quote => res.json(quote))
    .catch(error => next(error)); // passes error to app.js
}

function updateQuote(req, res, next) {
  Quote.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
      Quote.findOne({_id: req.params.id})
        .then(quote => res.send(quote));
    })
    .catch(next); // passes error to app.js
}

function deleteQuote(req, res, next) {
  Quote.findByIdAndRemove({
    _id: req.params.id
  })
    .then(quote => res.send(quote))
    .catch(next); // passes error to app.js
}

module.exports = {
  collateTags,
  retrieveRandomQuote,
  displayAllQuotes,
  displaySelectedQuotes,
  retrieveQuotes,
  postQuote,
  updateQuote,
  deleteQuote
};