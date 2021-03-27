import { Document } from 'mongoose';
export declare type QuestionDocument = Question & Document;
export declare class Question {
    uid: string;
    content: string;
    date: Date;
}
export declare const QuestionSchema: import("mongoose").Schema<Document<Question, {}>, import("mongoose").Model<any, any>, undefined>;
