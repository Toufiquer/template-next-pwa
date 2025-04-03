import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
    },
    passCode: { type: String, required: true },
    alias: { type: String, required: true },
    role: {
      type: String,
      required: false,
      enum: ['user', 'admin', 'moderator'],
      default: 'user',
    },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model('User', userSchema);

export interface IUser {
  _id: string;
  name: string;
  email: string;
  passCode: string;
  alias: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt?: Date;
  updatedAt?: Date;
}
