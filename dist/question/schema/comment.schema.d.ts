import { Document } from 'mongoose';
export declare type CommentDocument = Comment & Document;
export declare class Comment {
    uid: string;
    questionId: string;
    content: string;
    date: Date;
    repcomment: Array<any>;
}
export declare const CommentSchema: import("mongoose").Schema<Document<Comment, {}>, import("mongoose").Model<any, any>, undefined>;
