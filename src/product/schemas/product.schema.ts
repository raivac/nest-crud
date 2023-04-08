import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: String,
  description: String,
  imageURL: String,
  price: Number,
  created: {
    type: Date,
    default: Date.now,
  },
});
