import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  _id: { type: String, default: uuid },
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

export const Comment = model('Comment', CommentSchema);
