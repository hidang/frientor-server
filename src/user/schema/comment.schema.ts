import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Repcomment } from './repcomment.schema';
export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  uid: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [Repcomment], default: [] })
  repcoment: [];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
