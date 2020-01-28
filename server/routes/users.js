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
    check('email', 'Please enter an email address').isEmail(),
    check('password', 'Please enter a password with 12 or more characters').isLength({ min: 12 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ error: [{ msg: 'User already exists' }] });
      }

      if (email !== 'tardis@cazyw.dev') {
        return res.status(403).json({ error: [{ msg: 'Thank you, but registration is currently closed' }] });
      }

      user = new User({
        email,
        password
      });
      const salt = await bcrypt.genSalt(parseInt(process.env.JWT_SALT));
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, process.env.JWT_PVT, { expiresIn: parseInt(process.env.JWT_EXPIRE) }, (err, token) => {
        if (err) throw err;
        res.status(201).json({ token: token });
      });
    } catch (error) {
      return res.status(400).json({ error: [{ msg: `Error: ${error}` }] });
    }
  }
);

module.exports = router;
