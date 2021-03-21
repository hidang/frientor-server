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
  name: string;

  @Prop({ required: false })
  photoURL: string;

  @Prop({ required: false })
  bio: string;

  @Prop({ required: false })
  location: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.static('getUserByUid', async function (uid): Promise<
  Document<User>
> {
  return await this.findOne({ uid: uid });
});
