import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';

//-----------------------------------------------------------------------------
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async Register(user: UserDto): Promise<{ message: string }> {
    //check user exist?
    const _user = await this.userModel.findOne({ uid: user.uid });
    //add user to users collection
    if (!_user) {
      try {
        await new this.userModel(user).save();
        return { message: 'Saved user' };
      } catch (err) {
        console.log(err);
        return { message: err.message };
      }
    }
  }

  async GetUserByUid(uid: string): Promise<UserDocument> {
    return this.userModel['getUserByUid'](uid);
  }
  // async EditUser(user: Request)
}
