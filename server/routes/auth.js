const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { User } = require('../../models/user');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: `Error: server error ${error}` });
  }
});

// @route POST
// @desc  Authenticate user and get token
router.post(
  '/',
  [check('email', 'Email is required').isEmail(), check('password', 'Password is required').exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, process.env.JWT_PVT, { expiresIn: process.env.JWT_EXPIRE }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      });
    } catch (error) {
      return res.status(400).json({ errors: [{ msg: `Error: ${error}` }] });
    }
  }
);

module.exports = router;
