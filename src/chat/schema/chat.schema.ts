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

  // @Prop({ required: true })
  // questionId: string;

  @Prop({ required: false })
  title: string;
  @Prop({ required: true })
  commentId: string;

  @Prop({ required: true })
  content: Array<any>;
  @Prop({ required: true })
  public: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

ChatSchema.static(
  'GetChatInfoOfUserInComment',
  async function (uid, commentid): Promise<Document<Chat>[]> {
    //https://masteringjs.io/tutorials/mongoose/find
    return await this.find({
      $or: [
        {
          $and: [{ uid1: uid }, { commentId: commentid }],
        },
        {
          $and: [{ uid2: uid }, { commentId: commentid }],
        },
      ],
    });
  },
);

ChatSchema.static(
  'GetChatContentOfUserInComment',
  async function (uid, idChat): Promise<Document<Chat>[]> {
    return await this.findOne({
      $or: [
        {
          $and: [{ uid1: uid }, { _id: idChat }],
        },
        {
          $and: [{ uid2: uid }, { _id: idChat }],
        },
      ],
    });
  },
);
