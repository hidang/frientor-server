import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatDto } from './dto/chat.dto';
import { Document } from 'mongoose';

//-----------------------------------------------------------------------------
import { Chat, ChatDocument } from './schema/chat.schema';
import { ChatContentDto } from './dto/chatContent.dto';
//-----------------------------------------------------------------------------
@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async GetChatInfoOfUserInComment(
    uid: string,
    commentid: string,
  ): Promise<any> {
    return this.chatModel['GetChatInfoOfUserInComment'](uid, commentid);
  }

  async GetChatContentOfUserInComment(
    uid: string,
    idChat: string,
  ): Promise<any> {
    return this.chatModel['GetChatContentOfUserInComment'](uid, idChat);
  }

  async CreateChatOfUserInComment(
    uid: string,
    idComment: string,
    Body: ChatDto,
  ): Promise<any> {
    const chat1 = await this.chatModel.findOne({
      uid1: uid,
      uid2: Body.uid2,
      commentId: idComment,
    });
    const chat2 = await this.chatModel.findOne({
      uid1: Body.uid2,
      uid2: uid,
      commentId: idComment,
    });
    if (chat1 || chat2) return { message: 'Chat is exist' };
    try {
      const chat: Chat = {
        uid1: uid,
        uid2: Body.uid2,
        commentId: idComment,
        title: '',
        content: Body.content,
        public: false,
      };
      await new this.chatModel(chat).save();
      return { message: 'Saved chithub' };
    } catch (err) {
      return { message: err };
    }
  }

  async AddChatContent(
    user: any,
    idChat: string,
    Body: ChatContentDto,
  ): Promise<{ message: string }> {
    try {
      const uid = user.uid;
      const contentChat: any = {
        uid: uid,
        content: Body.content,
        date: Body.date,
      };
      await this.chatModel.findByIdAndUpdate(
        idChat,
        { $push: { content: contentChat } },
        // eslint-disable-next-line prettier/prettier
      );
      return { message: 'Saved content' };
    } catch (err) {
      return { message: err };
    }
  }
}
