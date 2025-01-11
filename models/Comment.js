const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  avatarURL: { type: String },
  text: { type: String, required: true },
  votes: {
    upvotedBy: [{ type: Schema.Types.Mixed }],
    downvotedBy: [{ type: Schema.Types.Mixed }]
  },
  createdAt: { type: Date, default: Date.now }
});
module.exports =  model('Comment', CommentSchema);
