const express = require('express');
const { check } = require('express-validator');

// Middleware
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');

// Services
const userService = require('../../services/userService');

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
  validate,
  async (req, res) => {
    try {
      const response = await userService.register(req.body);
      return res.status(response.status).json(response.getBody());
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
    const response = await userService.getById(req.user.id);
    return res.status(response.status).json(response.getBody());
  } catch (err) {
    return res.status(500).send('Server error');
  }
});

module.exports = {
  prefixUrl,
  router
};
