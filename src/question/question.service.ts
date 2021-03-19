import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// //-----------------------------------------------------------------------------
import { Comment, CommentDocument } from './schema/comment.schema';
import { CommentDto } from './dto/comment.dto';
import { QuestionDto } from './dto/question.dto';
import { Question, QuestionDocument } from './schema/question.schema';
//-----------------------------------------------------------------------------
@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async AddQuestion(
    user: any,
    Body: QuestionDto,
  ): Promise<{ message: string }> {
    if (!user) return { message: 'user not login' };
    try {
      const uid = user.uid;
      const postNe: Question = {
        uid: uid,
        content: Body.content,
        date: Body.date,
      };
      await new this.questionModel(postNe).save();

      return { message: 'saved post' };
    } catch (err) {
      return { message: err };
    }
  }

  async AddComment(user: any, Body: CommentDto): Promise<{ message: string }> {
    if (!user) return { message: 'user not login' };
    try {
      const _comment: Comment = {
        uid: user.uid,
        content: Body.content,
        questionId: Body.questionId,
        date: Body.date,
        repcoment: [],
      };
      await new this.commentModel(_comment).save();
      return { message: 'saved comment' };
    } catch (err) {
      return { message: err };
    }
  }
}
