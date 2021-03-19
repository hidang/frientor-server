import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  uid: string;

  @Prop({ required: true })
  questionId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  repcoment: Array<any>;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
