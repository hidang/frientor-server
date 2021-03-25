import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatDto } from './dto/chat.dto';
//-----------------------------------------------------------------------------
import { Chat, ChatDocument } from './schema/chat.schema';
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
}
