const express = require('express');
// Need express Router to handle each routes
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // '-password' cause i don't want to return password for security
    // req.user.id come from to the auth middleware
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Authentificate user & get token = login route
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please includ a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // check if user exist by email
      let user = await User.findOne({ email });

      // if user doesnt exist
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // if user exist, continue to check the password
      // true if password === password user hash
      const isMatch = await bcrypt.compare(password, user.password);

      // if false
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // else
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
