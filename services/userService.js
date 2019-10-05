const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { response } = require('../helpers/models');

// Models
const User = require('../models/User');

const userService = {
  register: async user => {
    const { name, email, password } = user;

    // check if email already exists
    let existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail) {
      return new response(400, {
        errors: [{ msg: 'Email address already exists' }]
      });
    }

    // try get user's gravatar
    const avatar = gravatar.url(email, {
      s: '200', // size
      r: 'pg', // rating
      d: 'mm' // default
    });

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save user
    user = new User({
      name,
      avatar,
      email,
      password: hashedPassword
    });
    await user.save();

    // response
    const payload = {
      user: {
        id: user.id
      }
    };

    return new Promise((resolve, reject) =>
      jwt.sign(
        payload,
        config.get('JWTSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) reject(err);
          resolve(new response(200, token));
        }
      )
    );
  },
  getById: async id => {
    const user = await User.findById(id).select('-password');
    return new response(200, user);
  }
};

module.exports = userService;
