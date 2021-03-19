import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//-----------------------------------------------------------------------------
import { Comment, CommentDocument } from './schema/comment.schema';
import { CommentDto } from './dto/comment.dto';
import { QuestionDto } from './dto/question.dto';
import { Question, QuestionDocument } from './schema/question.schema';
import { RepComment, RepCommentDocument } from './schema/repComment.schema';
import { RepCommentDto } from './dto/repComment.dto';
//-----------------------------------------------------------------------------
@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(RepComment.name)
    private repCommentModel: Model<RepCommentDocument>,
  ) {}

  async AddQuestion(
    user: any,
    Body: QuestionDto,
  ): Promise<{ message: string }> {
    try {
      const uid = user.uid;
      const postNe: Question = {
        uid: uid,
        content: Body.content,
        date: Body.date,
      };
      await new this.questionModel(postNe).save();
      return { message: 'Saved post' };
    } catch (err) {
      return { message: err };
    }
  }
  async EditQuestion(
    user: any,
    Body: QuestionDto,
  ): Promise<{ message: string }> {
    return this.questionModel['EditQuestion'](user, Body);
  }
  async AddComment(user: any, Body: CommentDto): Promise<{ message: string }> {
    try {
      const _comment: Comment = {
        uid: user.uid,
        content: Body.content,
        questionId: Body.questionId,
        date: Body.date,
        repcoment: [],
      };
      await new this.commentModel(_comment).save();
      return { message: 'Saved comment' };
    } catch (err) {
      return { message: err };
    }
  }
  async EditComment(user: any, Body: CommentDto): Promise<{ message: string }> {
    return this.commentModel['EditComment'](user, Body);
  }
  async DeleteComment(
    user: any,
    commentId: string,
  ): Promise<{ message: string }> {
    try {
      const _comment = await this.commentModel.findByIdAndDelete(commentId);
      if (_comment.uid != user.uid)
        return { message: 'user does not own this comment' };
      return { message: 'Deleted comment' };
    } catch (err) {
      return { message: err.message };
    }
  }
  // async AddRepComment(
  //   user: any,
  //   Body: RepCommentDto,
  //   idComment: string,
  // ): Promise<{ message: string }> {
  //   try {
  //     const _comment: RepComment = {
  //       uid: user.uid,
  //       content: Body.content,
  //       date: Body.date,
  //     };
  //     const _repComment = await new this.repCommentModel(_comment).save();
  //     const _comment = await this.commentModel.findById(idComment);
  //     _comment.
  //     //add _id _repComment to comment
  //     return { message: 'saved' };
  //   } catch (err) {
  //     return { message: err };
  //   }
  // }
}
