const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  },
  status: {
    type: String
  },
  skills: {
    type: [String]
  },
  bio: {
    type: String
  },
  company: {
    type: String
  },
  githubUsername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      isCurrent: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldOfStudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      isCurrent: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    linkedIn: {
      type: String
    },
    github: {
      type: String
    },
    dribbble: {
      type: String
    },
    fiverr: {
      type: String
    },
    upwork: {
      type: String
    },
    freelancer: {
      type: String
    },
    toptal: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
