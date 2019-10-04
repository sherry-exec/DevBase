const express = require('express');

const prefixUrl = '/api/profiles';
const router = express.Router();

router.get('/', (req, res) => res.send('Profiles route'));

module.exports = {
    prefixUrl,
    router
};