/*
 * Shakespeare Quote App
 * Route handling for users
 */
'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.status(200).json({ msg: 'get users again' }));
router.post('/', (req, res) => res.status(200).json({ msg: 'creating a user' }));

module.exports = router;
