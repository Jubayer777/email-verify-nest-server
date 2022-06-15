import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
