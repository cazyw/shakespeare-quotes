/*
 * Shakespeare Quote App
 * Route handling
 */
'use strict';

const express = require('express');
const quotesController = require('../controllers/quotes');
const router = express.Router();
const auth = require('../middleware/auth');

// get a random quote from the db
router.get('/random', quotesController.retrieveRandomQuote);

// get a list of quotes from the db
router.get('/', quotesController.retrieveQuotes);

// add a new quote to the db
router.post('/', auth, quotesController.postQuote);

// update a quote in the db
router.put('/:id', quotesController.updateQuote);

// delete a quote from the db
router.delete('/:id', quotesController.deleteQuote);

module.exports = router;
