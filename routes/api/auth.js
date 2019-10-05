const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

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
  async (req, res) => {
    // input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

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
