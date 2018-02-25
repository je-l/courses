const mongoose = require('mongoose');

const { Schema } = mongoose;

const Blog = mongoose.model('Blog', {
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

module.exports = Blog;
