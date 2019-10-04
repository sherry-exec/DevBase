const authRoutes = require('./auth');
const userRoutes = require('./users');
const profileRoutes = require('./profiles');
const postRoutes = require('./posts');

const routes = [authRoutes, userRoutes, profileRoutes, postRoutes];

module.exports = routes;
