import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { QuestionDto } from '../dto/question.dto';

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

QuestionSchema.static(
  'EditQuestion',
  async function (
    user,
    question: QuestionDto,
  ): Promise<{
    message: string;
  }> {
    try {
      const quetionTemp = (await this.findById(
        question._id,
      )) as QuestionDocument;
      if (user.uid != quetionTemp.uid)
        return { message: 'User does not own this question' };
      quetionTemp.content = question.content;
      await quetionTemp.save();
      return { message: 'edited question' };
    } catch (error) {
      return { message: error.message };
    }
  },
);

QuestionSchema.static('getAllQuestion', async function (): Promise<
  Document<Question>[]
> {
  return this.find({}, (err, questions) => {
    return questions;
  });
});
QuestionSchema.static('getQuestionById', async function (id: string): Promise<
  Document<Question>[]
> {
  return this.findOne({ _id: id }, (err, question) => {
    return question;
  });
});
