import { UserDocument } from './schema/user.schema';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(request: Request): Promise<{
        message: string;
    }>;
    GetUserByUid(params: any): Promise<UserDocument>;
}
