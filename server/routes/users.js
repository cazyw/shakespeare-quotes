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
const jwt = require('jsonwebtoken');

router.post(
  '/',
  [
    check('email').isEmail(),
    check('password', 'Please enter a password with 12 or more characters').isLength({ min: 12 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    console.log('EMAIL', email);
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ error: [{ msg: 'User already exists' }] });
      }

      if (email !== 'tardis@cazyw.dev') {
        return res.status(200).send({ msg: 'Thank you, but registration is currently closed' });
      }

      user = new User({
        email,
        password
      });
      console.log('salting');
      const salt = await bcrypt.genSalt(parseInt(process.env.JWT_SALT));
      user.password = await bcrypt.hash(password, salt);
      console.log('saving');
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, process.env.JWT_PVT, { expiresIn: process.env.JWT_EXPIRE }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ msg: token });
      });
    } catch (error) {
      return res.status(400).json({ error: [{ msg: `Error: ${error}` }] });
    }
  }
);

module.exports = router;
