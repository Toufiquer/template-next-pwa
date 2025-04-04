import mongoose, { Schema, Document } from 'mongoose';

const _4_template_Schema = new Schema(
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
      enum: ['_4_template_', 'admin', 'moderator'],
      default: '_4_template_',
    },
  },
  { timestamps: true },
);

export default mongoose.models._3_template_ || mongoose.model('_3_template_', _4_template_Schema);

export interface I_3_template_ extends Document, Pick<mongoose.SchemaDefinition, 'name' | 'email' | 'passCode' | 'alias' | 'role'> {
  createdAt?: Date;
  updatedAt?: Date;
}
