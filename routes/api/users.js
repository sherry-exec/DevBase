const express = require('express');

const prefixUrl = '/api/users';
const router = express.Router();

router.get('/', (req, res) => res.send('Users route'));

module.exports = {
    prefixUrl,
    router
};