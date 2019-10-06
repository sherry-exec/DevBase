const { response } = require('../helpers/models');

// Models
const Profile = require('../models/Profile');
const User = require('../models/User');

const profileService = {
  create: async profile => {},
  update: async profile => {},
  getById: async id => {
    const profile = await Profile.findOne({ user: id }).populate('user', [
      'name',
      'avatar'
    ]);
    if (!profile) {
      return new response(404, { msg: 'Profile not found' });
    }
    return new response(200, profile);
  }
};

module.exports = profileService;
