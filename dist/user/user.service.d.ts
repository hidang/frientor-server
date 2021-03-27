import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { UserDocument } from './schema/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    Register(user: UserDto): Promise<{
        message: string;
    }>;
    GetUserByUid(uid: string): Promise<UserDocument>;
}
