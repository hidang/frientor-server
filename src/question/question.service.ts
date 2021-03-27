import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//-----------------------------------------------------------------------------
import { Comment, CommentDocument } from './schema/comment.schema';
import { CommentDto } from './dto/comment.dto';
import { QuestionDto } from './dto/question.dto';
import { Question, QuestionDocument } from './schema/question.schema';
import { RepComment, RepCommentDocument } from './schema/repcomment.schema';
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
  async GetAllQuestion(): Promise<QuestionDocument[]> {
    return this.questionModel['getAllQuestion']();
  }
  async GetQuestionById(id: string): Promise<QuestionDocument[]> {
    return this.questionModel['getQuestionById'](id);
  }
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
      //check Question exist?
      const _question = await this.questionModel.findById(questionId);
      if (!_question) return { message: 'Question does not exist' };
      //check use is own this question?
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
  async GetAllCommentInQuestion(
    questionId: string,
  ): Promise<CommentDocument[]> {
    return this.commentModel['GetAllCommentInQuestion'](questionId);
  }
  async AddComment(
    user: any,
    Body: CommentDto,
    idQuestion: string,
  ): Promise<{ message: string }> {
    try {
      const _question = await this.questionModel.findById(idQuestion);
      if (!_question) return { message: 'Question does not exist' };
      const _comment: Comment = {
        uid: user.uid,
        content: Body.content,
        questionId: idQuestion,
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
        return { message: 'User does not own this comment' };
      //FIXME: chưa tối ưu
      await this.commentModel.findByIdAndDelete(commentId);
      return { message: 'Deleted comment' };
    } catch (err) {
      return { message: err.message };
    }
  }

  //RepComment
  async GetAllRepCommentByIdComment(
    idComment: string,
  ): Promise<RepCommentDocument[]> {
    return this.repCommentModel['getAllRepCommentnByIdComment'](idComment);
  }
  async AddRepComment(
    user: any,
    Body: RepCommentDto,
    idComment: string,
  ): Promise<{ message: string }> {
    try {
      //check CommentRoot exist?
      const _commentRoot = await this.commentModel.findById(idComment);
      if (!_commentRoot) return { message: 'CommentRoot does not exist' };
      //create RepComment
      const repComment: RepComment = {
        uid: user.uid,
        commentId: idComment,
        content: Body.content,
        date: Body.date,
      };
      const _repComment = await new this.repCommentModel(repComment).save();
      //add _id repComment to CommentRoot
      await this.commentModel.findByIdAndUpdate(
        idComment,
        { $push: { repcomment: _repComment._id } },
        // eslint-disable-next-line prettier/prettier
      );
      return { message: 'saved' };
    } catch (err) {
      return { message: err };
    }
  }
  async EditRepComment(
    user: any,
    Body: RepCommentDto,
  ): Promise<{ message: string }> {
    return this.repCommentModel['EditRepComment'](user, Body);
  }
  async DeleteRepComment(
    user: any,
    repCommentId: string,
  ): Promise<{ message: string }> {
    try {
      const _repComment = await this.repCommentModel.findById(repCommentId);
      if (!_repComment) return { message: 'RepComment does not exist' };
      if (_repComment.uid != user.uid)
        return { message: 'User does not own this repcomment' };
      //delete repcomment in repcomments collection
      await this.repCommentModel.findByIdAndDelete(repCommentId);
      //pop repcomment in comments collection
      await this.commentModel.findByIdAndUpdate(
        _repComment.commentId,
        { $pull: { repcomment: _repComment._id } },
        // eslint-disable-next-line prettier/prettier
      );
      return { message: 'Deleted repcomment' };
    } catch (err) {
      return { message: err.message };
    }
  }
}
