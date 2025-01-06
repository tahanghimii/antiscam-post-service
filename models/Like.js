import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const { Schema, model } = mongoose;

const LikeSchema = new Schema({
  _id: { type: String, default: uuid },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  avatarURL: { type: String }
});

export const Like = model('Like', LikeSchema);
