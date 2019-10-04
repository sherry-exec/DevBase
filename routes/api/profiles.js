const express = require('express');

// Profiles API route config
const prefixUrl = '/api/profiles';
const router = express.Router();

router.get('/', (req, res) => res.send('Profiles route'));

module.exports = {
  prefixUrl,
  router
};
