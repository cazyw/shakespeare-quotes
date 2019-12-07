/*
 * Shakespeare Quote App
 * Route handling
 */
'use strict';

const express = require('express');
const quotesController = require('../controllers/quotes');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// get a random quote from the db
router.get('/random', quotesController.retrieveRandomQuote);

// get a list of quotes from the db
router.get('/', quotesController.retrieveQuotes);

// add a new quote to the db
// router.post(
//   '/',
//   [
//     check('work', 'Please provide the title').notEmpty(),
//     check('quote', 'Please provide a quote').notEmpty(),
//     check('tags', 'Please provide at least one tag')
//       .isArray()
//       .isLength({ min: 1 })
//   ],
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     return quotesController.postQuote(req, res);
//   }
// );

// update a quote in the db
router.put('/:id', quotesController.updateQuote);

// delete a quote from the db
router.delete('/:id', quotesController.deleteQuote);

module.exports = router;
