const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

// Users API route config
const prefixUrl = '/api/users';
const router = express.Router();

// @route   POST /api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email address is invalid').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({
      min: 6,
      max: 18
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    try {
      // check if email already exists
      let existingUserWithEmail = await User.findOne({ email });
      console.log(existingUserWithEmail);
      if (existingUserWithEmail) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Email address already exists' }] });
      }

      // try get user's gravatar
      const avatar = gravatar.url(email, {
        s: '200', // size
        r: 'pg', // rating
        d: 'mm' // default
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // save user
      const user = new User({
        name,
        avatar,
        email,
        password: hashedPassword
      });
      await user.save();

      // response
      return res.send('User registered');
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server error');
    }
  }
);

module.exports = {
  prefixUrl,
  router
};
