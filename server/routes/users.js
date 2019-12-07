/*
 * Shakespeare Quote App
 * Route handling for users
 */
'use strict';

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const saltRounds = 12;
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.status(200).json({ msg: 'get users again' }));

router.post(
  '/',
  [
    check('email').isEmail(),
    check('password', 'Please enter a password with 12 or more characters').isLength({ min: 12 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      if (email !== 'tardis@cazyw.dev') {
        return res.status(200).send({ msg: 'Thank you, but registration is currently closed' });
      }

      user = new User({
        email,
        password
      });

      const salt = await bcrypt.genSalt(saltRounds);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, process.env.JWT_PVT, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      });

      // res.status(200).json({ msg: 'User registered' });
    } catch (error) {
      return res.status(400).json({ errors: [{ msg: `Error: ${error}` }] });
    }
  }
);

module.exports = router;
