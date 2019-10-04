const express = require('express');

const prefixUrl = '/api/posts';
const router = express.Router();

router.get('/', (req, res) => res.send('Posts route'));

module.exports = {
    prefixUrl,
    router
};