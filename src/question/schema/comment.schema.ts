import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CommentDto } from '../dto/comment.dto';
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
  repcomment: Array<any>;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.static(
  'EditComment',
  async function (
    user,
    question: CommentDto,
  ): Promise<{
    message: string;
  }> {
    try {
      const commentTemp = (await this.findById(
        question._id,
      )) as CommentDocument;
      if (user.uid != commentTemp.uid)
        return { message: 'User does not own this question' };
      commentTemp.content = question.content;
      await commentTemp.save();
      return { message: 'Edited question' };
    } catch (error) {
      return { message: error.message };
    }
  },
);
CommentSchema.static(
  'GetAllCommentInQuestion',
  async function (questionId): Promise<Document<Comment>[]> {
    return this.find({ questionId: questionId }, (err, comments) => {
      return comments;
    });
  },
);
