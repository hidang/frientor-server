import { Model } from 'mongoose';
import { ChatDto } from './dto/chat.dto';
import { ChatDocument } from './schema/chat.schema';
import { ChatContentDto } from './dto/chatContent.dto';
export declare class ChatService {
    private chatModel;
    constructor(chatModel: Model<ChatDocument>);
    GetChatInfoOfUserInComment(uid: string, commentid: string): Promise<any>;
    GetChatContentOfUserInComment(uid: string, idChat: string): Promise<any>;
    CreateChatOfUserInComment(uid: string, idComment: string, Body: ChatDto): Promise<any>;
    AddChatContent(user: any, idChat: string, Body: ChatContentDto): Promise<{
        message: string;
    }>;
}
