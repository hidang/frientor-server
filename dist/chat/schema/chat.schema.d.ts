import { Document } from 'mongoose';
export declare type ChatDocument = Chat & Document;
export declare class Chat {
    uid1: string;
    uid2: string;
    title: string;
    commentId: string;
    content: Array<any>;
    public: boolean;
}
export declare const ChatSchema: import("mongoose").Schema<Document<Chat, {}>, import("mongoose").Model<any, any>, undefined>;
