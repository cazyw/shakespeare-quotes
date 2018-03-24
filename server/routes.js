/*
 * Shakespeare Quote App
 * Route handling
 */
'use strict';

const express = require('express');
const quotesController = require('./controllers/quotes');
const router = express.Router();

// get a list of quotes from the db
router.get('/quotes', quotesController.retrieveQuotes);

// add a new quote to the db
router.post('/quotes', quotesController.postQuote);

// update a quote in the db
router.put('/quotes/:id', quotesController.updateQuote);

// delete a quote from the db
router.delete('/quotes/:id', quotesController.deleteQuote);

module.exports = router;