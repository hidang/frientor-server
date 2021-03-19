import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RepCommentDocument = RepComment & Document;

@Schema()
export class RepComment {
  @Prop({ required: true })
  uid: string;
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  date: Date;
}

export const RepCommentSchema = SchemaFactory.createForClass(RepComment);
