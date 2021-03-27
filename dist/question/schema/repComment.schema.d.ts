import { Document } from 'mongoose';
export declare type RepCommentDocument = RepComment & Document;
export declare class RepComment {
    uid: string;
    commentId: string;
    content: string;
    date: Date;
}
export declare const RepCommentSchema: import("mongoose").Schema<Document<RepComment, {}>, import("mongoose").Model<any, any>, undefined>;
