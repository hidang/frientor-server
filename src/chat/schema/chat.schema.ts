import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
//import { CommentDto } from '../dto/comment.dto';
export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
  uid1: string;
  @Prop({ required: true })
  uid2: string;

  @Prop({ required: true })
  questionId: string;

  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  commentId: string;

  @Prop({ required: true })
  content: Array<any>;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
