import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  uid: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  displayName: string;

  // @Prop({ required: false })
  // Location: {
  //   Contry: string;
  //   City: string;
  //   Content: string
  // };
}

export const UserSchema = SchemaFactory.createForClass(User);
