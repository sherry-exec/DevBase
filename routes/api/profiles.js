const express = require('express');
const { check } = require('express-validator');

// Middleware
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');

// Services
const profileService = require('../../services/profileService');

// Profiles API route config
const prefixUrl = '/api/profiles';
const router = express.Router();

// @route   POST /api/profiles
// @desc    Update current user's profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Atleast one skill is required')
        .not()
        .isEmpty()
    ],
    validate
  ],
  async (req, res) => {}
);

// @route   POST /api/profiles/:userId
// @desc    Get user profile
// @access  Public
router.get('/:userId', async (req, res) => {
  try {
    const response = await profileService.getById(req.params.userId);
    return res.status(response.status).json(response.data);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }
});

// @route   POST /api/profiles/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const response = await profileService.getById(req.user.id);
    return res.status(response.status).json(response.data);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }
});

module.exports = {
  prefixUrl,
  router
};
