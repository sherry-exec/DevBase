const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../middleware/auth');
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
    // input validation
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
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('JWTSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.send(token);
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server error');
    }
  }
);

// @route   GET /api/users
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json(user);
  } catch (err) {
    return res.status(500).send('Server error');
  }
});

module.exports = {
  prefixUrl,
  router
};
