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
  //Question
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
  async DeleteQuestion(
    user: any,
    questionId: string,
  ): Promise<{ message: string }> {
    try {
      const _question = await this.questionModel.findById(questionId);
      if (!_question) return { message: 'Question does not exist' };
      if (_question.uid != user.uid)
        return { message: 'user does not own this question' };
      //FIXME: chưa tối ưa
      await this.questionModel.findByIdAndDelete(questionId);
      return { message: 'Deleted question' };
    } catch (err) {
      return { message: err.message };
    }
  }
  //Comment
  async AddComment(user: any, Body: CommentDto): Promise<{ message: string }> {
    try {
      const _comment: Comment = {
        uid: user.uid,
        content: Body.content,
        questionId: Body.questionId,
        date: Body.date,
        repcomment: [],
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
      const _comment = await this.commentModel.findById(commentId);
      if (!_comment) return { message: 'Comment does not exist' };
      if (_comment.uid != user.uid)
        return { message: 'user does not own this comment' };
      //FIXME: chưa tối ưu
      await this.commentModel.findByIdAndDelete(commentId);
      return { message: 'Deleted comment' };
    } catch (err) {
      return { message: err.message };
    }
  }
  //RepComment
  async AddRepComment(
    user: any,
    Body: RepCommentDto,
    idComment: string,
  ): Promise<{ message: string }> {
    try {
      const repComment = {
        uid: user.uid,
        content: Body.content,
        date: Body.date,
      };
      //add id repComment to Comment root
      const _comment = await this.commentModel.findByIdAndUpdate(
        idComment,
        { $push: { repcomment: repComment } },
        // eslint-disable-next-line prettier/prettier
      );
      console.log(_comment);
      //FIXME: chua push vao array
      return { message: 'saved' };
    } catch (err) {
      return { message: err };
    }
  }
}
