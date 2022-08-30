import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { appKeys } from 'src/schemas/app.keys.schema';

export type AppDocument = App & Document;

@Schema()
export class App {
  @Prop()
  endpoint: string;

  @Prop()
  expirationTime?: null | number;

  @Prop(raw({
    p256dh: {type: String},
    auth: {type: String}
  }))
  keys: Record<string, string>;
  
  @Prop()
  organisation_id: string

  @Prop()
  user_id: string
}

export const AppSchema = SchemaFactory.createForClass(App);