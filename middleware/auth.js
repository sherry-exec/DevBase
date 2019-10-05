const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send('Token not found. Authorisation failed');
  }

  try {
    const decoded = jwt.verify(token, config.get('JWTSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).send('Token not valid. Authorisation failed');
  }
};
