import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { ChatContentDto } from './dto/chatContent.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    GetChatInfoOfUserInComment(request: Request, params: any): Promise<any>;
    GetChatContentOfUserInComment(request: Request, params: any): Promise<any>;
    CreateChatOfUserInComment(request: Request, params: any, Body: ChatDto): Promise<any>;
    AddChatContent(request: Request, params: any, Body: ChatContentDto): Promise<any>;
}
