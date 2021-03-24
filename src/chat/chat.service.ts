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
  async GetChithubOfUserInComment(
    uid: string,
    commentid: string,
  ): Promise<any> {
    return this.chatModel['GetChithubOfUserInComment'](uid, commentid);
  }
  async CreateChithubOfUserInComment(
    uid: string,
    idComment: string,
    body: ChatDto,
  ): Promise<any> {
    return this.chatModel['CreateChithubOfUserInComment'](uid, idComment, body);
  }
}
