const express = require('express');
const Quote = require('../models/quote');

const router = express.Router();

// get a list of quotes from the db
router.get('/quotes', (req, res, next) => {
  const selectedTags = (req.query.tags.split(',').map(item => item.trim()));
  Quote.find({
    tags: { $in: selectedTags }
  })
  .then((quote) => {
    res.send(quote);
  });
});

// add a new quote to the db
router.post('/quotes', (req, res, next) => {
  // save new instance of a quote (returns a promise)
  Quote.create(req.body)
  .then((quote) => {
    res.send(quote);
  })
  .catch(next); // passess to server.js

});

// update a quote in the db
router.put('/quotes/:id', (req, res, next) => {
  Quote.findByIdAndUpdate({_id: req.params.id}, req.body)
  .then((quote) => {
    Quote.findOne({_id: req.params.id})
    .then((quote) => {
      res.send(quote);
    });
  })
});

// delete a quote from the db
router.delete('/quotes/:id', (req, res, next) => {
  Quote.findByIdAndRemove({
    _id: req.params.id
  })
  .then((quote) => {
    res.send(quote);
  })
});



module.exports = router;