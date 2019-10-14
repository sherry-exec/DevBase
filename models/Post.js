const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  likes: [
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        unique: true
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        unique: true
      },
      text: {
        type: String,
        required: true
      },
      datePosted: {
        type: Date,
        default: Date.now
      }
    }
  ],
  datePosted: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
