import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    uid: string;
    email: string;
    name: string;
    photoURL: string;
    bio: string;
    location: Array<string>;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, {}>, import("mongoose").Model<any, any>, undefined>;
