import mongoose from 'mongoose';

const { Schema } = mongoose

export interface Post extends mongoose.Document {
  title: string,
  description: string,
  // author: 
}

export const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }
},{
  timestamps: true
})