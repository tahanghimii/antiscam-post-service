const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const { Schema, model } = mongoose;

const PostSchema = new Schema({
  _id: { type: String, default: uuid },
  content: { type: String, required: true },
  mediaUrl: { type: String },
  likes: {
    likeCount: { type: Number, default: 0 },
    likedBy: [{ type: Schema.Types.Mixed }],
    dislikedBy: [{ type: Schema.Types.Mixed }]
  },
  comments: [{ type: Schema.Types.Mixed }],
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatarURL: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = model('Post', PostSchema);
