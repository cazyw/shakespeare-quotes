/*
 * Shakespeare Quote App
 * Route handling
 */
'use strict';

const express = require('express');
const {Quote} = require('../models/quote');

const router = express.Router();


// get a list of quotes from the db
// if tags provided, must match at least one of the tags
// if no tags provided, display all
router.get('/quotes', (req, res, next) => {
  if(!req.query.tags){
    Quote.find({})
      .then((quote) => {
        res.send(quote);
      });
  } else {
    const selectedTags = (req.query.tags.split(',').map(item => item.trim()));
    Quote.find({
      tags: { $in: selectedTags }
    })
      .then((quote) => {
        res.send(quote);
      });
  }
});

// add a new quote to the db
router.post('/quotes', (req, res, next) => {
  // save new instance of a quote (returns a promise)
  Quote.create(req.body)
    .then((quote) => {
      res.send(quote);
    })
    .catch(next); // passes error to app.js

});

// update a quote in the db
router.put('/quotes/:id', (req, res, next) => {
  Quote.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(() => {
      Quote.findOne({_id: req.params.id})
        .then((quote) => {
          res.send(quote);
        });
    })
    .catch(next); // passes error to app.js
});

// delete a quote from the db
router.delete('/quotes/:id', (req, res, next) => {
  Quote.findByIdAndRemove({
    _id: req.params.id
  })
    .then((quote) => {
      res.send(quote);
    })
    .catch(next); // passes error to app.js
});

module.exports = router;