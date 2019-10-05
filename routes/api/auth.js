const express = require('express');
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const validate = require('../../middleware/validate');
const User = require('../../models/User');

// Auth API route config
const prefixUrl = '/api/auth';
const router = express.Router();

// @route   POST /api/auth
// @desc    Authenticate and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Email address is invalid').isEmail(),
    check('password', 'Password is required')
      .not()
      .isEmpty()
  ],
  validate,
  async (req, res) => {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    // check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send('Invalid credentials');
    }

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
  }
);

module.exports = {
  prefixUrl,
  router
};
