const { response } = require('../helpers/models');

// Models
const Post = require('../models/Post');

// Functions
const create = async data => {
  const post = new Post({
    ...data
  });
  await post.save();
  return new response(200, post.id);
};

const remove = async (postId, userId) => {
  const post = await Post.findOneAndDelete({ id: postId, user: userId });
  if (!post) {
    return new response(400);
  }
  return new response(200, post);
};

const like = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) {
    return new response(404);
  }
  if (post.likes.filter(liked => liked.user == userId).length > 0) {
    return new response(400).setMsg('Post already liked');
  }
  post.likes.unshift({ user: userId });
  await post.save();
  return new response(200, post.likes);
};

const unlike = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) {
    return new response(404);
  }
  if (post.likes.filter(liked => liked.user == userId).length < 1) {
    return new response(400).setMsg('Post not liked');
  }
  post.likes = post.likes.filter(liked => liked.user != userId);
  await post.save();
  return new response(200, post.likes);
};

const addComment = async data => {
  const comment = ({ user, text } = data);

  const post = await Post.findById(data.postId);
  if (!post) {
    return new response(404);
  }

  post.comments.unshift(comment);
  await post.save();

  return new response(200, post.comments);
};

const removeComment = async data => {
  const { userId, commentId, postId } = data;

  const post = await Post.findById(postId);
  if (!post) {
    return new response(404);
  }

  if (
    post.comments.filter(
      comment => comment._id == commentId && comment.user == userId
    ).length < 1
  ) {
    return new response(404);
  }

  post.comments = post.comments.filter(comment => comment._id != commentId);
  await post.save();

  return new response(200, post.comments);
};

const getById = async id => {
  const post = await Post.findById(id).populate('user', ['name', 'avatar']);
  if (!post) {
    return new response(404);
  }
  return new response(200, post);
};

const getAll = async () => {
  const posts = await Post.find()
    .populate('user', ['name', 'avatar'])
    .sort({ datePosted: -1 });
  return new response(200, posts);
};

module.exports = {
  create,
  remove,
  like,
  unlike,
  addComment,
  removeComment,
  getById,
  getAll
};
