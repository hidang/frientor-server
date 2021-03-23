import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RepCommentDto } from '../dto/repComment.dto';

export type RepCommentDocument = RepComment & Document;

@Schema()
export class RepComment {
  @Prop({ required: true })
  uid: string;
  @Prop({ required: true })
  commentId: string;
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  date: Date;
}

export const RepCommentSchema = SchemaFactory.createForClass(RepComment);

RepCommentSchema.static(
  'EditRepComment',
  async function (
    user,
    repComment: RepCommentDto,
  ): Promise<{
    message: string;
  }> {
    try {
      const repCommentTemp = (await this.findById(
        repComment._id,
      )) as RepCommentDocument;
      if (!repCommentTemp) return { message: 'Repcomment does not exist' };
      if (user.uid != repCommentTemp.uid)
        return { message: 'User does not own this repComment' };
      repCommentTemp.content = repComment.content;
      await repCommentTemp.save();
      return { message: 'Edited repcomment' };
    } catch (error) {
      return { message: error.message };
    }
  },
);

RepCommentSchema.static(
  'getAllRepCommentnByIdComment',
  async function (idComment: string): Promise<Document<RepComment>[]> {
    return this.find({ commentId: idComment }, (err, repComment) => {
      return repComment;
    });
  },
);
