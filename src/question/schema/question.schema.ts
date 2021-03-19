import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop({ required: true })
  uid: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  date: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
