import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  _id: ObjectId;
  
  @Prop({required:true})
  user_name: string;

  @Prop({required:true})
  password: string;

  @Prop({required:true})
  age: number;
  
  @Prop()
  user_token: string;

}

export const UserSchema = SchemaFactory.createForClass(User);