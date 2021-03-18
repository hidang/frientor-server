import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RepcommentDocument = Repcomment & Document;

@Schema()
export class Repcomment {
  @Prop({ required: true })
  uid: string;
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  date: Date;
}

export const RepcommentSchema = SchemaFactory.createForClass(Repcomment);
