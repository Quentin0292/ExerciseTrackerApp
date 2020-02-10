const express = require('express');
// Need express Router to handle each routes
const router = express.Router();
// hash password for more security
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const config = require('config');

// user model
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please includ a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // check if error in different check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // try to find user in db
      let user = await User.findOne({ email });

      // if user === true, it's mean user already exist, he can't register again
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // if doesn't exist, create a new user
      user = new User({
        name,
        email,
        password
      });

      // need to crypt password before add user in DB using bcryptjs
      const salt = await bcrypt.genSalt(10);

      // update the password value
      user.password = await bcrypt.hash(password, salt);

      // save user in db
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      // generate a token for user
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
      res.status(404).send('Server error');
    }
  }
);

module.exports = router;
