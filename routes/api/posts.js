const express = require('express');
const { check } = require('express-validator');

// Middleware
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');

// Services
const postService = require('../../services/postService');

// API route config
const prefixUrl = '/api/posts';
const router = express.Router();

// @route   POST /api/posts
// @desc    Create new post
// @access  private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('text', 'Post body is required')
        .not()
        .isEmpty()
    ],
    validate
  ],
  async (req, res) => {
    try {
      const post = {
        user: req.user.id,
        title: req.body.title,
        text: req.body.text
      };

      const result = await postService.create(post);
      return res.status(result.status).json(result.getBody());
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server error');
    }
  }
);

// @route   DELETE /api/posts/:id
// @desc    Delete a post
// @access  private
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await postService.remove(req.params.id, req.user.id);
    return res.status(result.status).json(result.getBody());
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }
});

// @route   PUT /api/posts/like/:id
// @desc    Like a post
// @access  private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const result = await postService.like(req.params.id, req.user.id);
    return res.status(result.status).json(result.getBody());
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }
});

// @route   PUT /api/posts/unlike/:id
// @desc    Unlike a post
// @access  private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const result = await postService.unlike(req.params.id, req.user.id);
    return res.status(result.status).json(result.getBody());
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }
});

// @route   GET /api/posts/:id
// @desc    Get post
// @access  public
router.get('/:id', async (req, res) => {
  try {
    const result = await postService.getById(req.params.id);
    return res.status(result.status).json(result.getBody());
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }
});

// @route   GET /api/posts
// @desc    Get all posts
// @access  public
router.get('/', async (req, res) => {
  try {
    const result = await postService.getAll();
    return res.status(result.status).json(result.getBody());
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server error');
  }
});

module.exports = {
  prefixUrl,
  router
};
