const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = mongoose.model('User', {
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  hash: { type: String, required: true },
  adult: { type: Boolean, default: true },
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
});

module.exports = User;
