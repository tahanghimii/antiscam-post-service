const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const { Schema, model } = mongoose;

const PostSchema = new Schema({
  _id: { type: String, default: uuid },
  content: { type: String, required: true },
  mediaUrl: { type: String },
  likes: {
    _id: { type: String, default: uuid },
    likeCount: { type: Number, default: 0 },
    likedBy: [{ type: Schema.Types.Mixed }],
    dislikedBy: [{ type: Schema.Types.Mixed }],
  },
  comments: [{ // This will store the entire comment object, not just a reference
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    avatarURL: { type: String },
    text: { type: String, required: true },
    votes: {
      upvotedBy: [{ type: Schema.Types.Mixed }],
      downvotedBy: [{ type: Schema.Types.Mixed }],
    },
    createdAt: { type: Date, default: Date.now },
  }],
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatarURL: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


module.exports = model('Post', PostSchema);
