import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

// import { CommentDto } from '../question/dto/comment.dto';
//-----------------------------------------------------------------------------
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async Register(user): Promise<boolean> {
    //user login with firebase?
    if (!user) {
      return false;
    }
    //search user exist?
    const _user = await this.userModel.findOne({ uid: user.uid });
    //only one user with uid
    if (!_user) {
      try {
        await new this.userModel(user).save();
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  }
  // async AddRepComment(
  //   user: any,
  //   Body: CommentDto,
  // ): Promise<{ message: string }> {
  //   if (!user) return { message: 'user not login' };
  //   try {
  //     const postNe: Comment = {
  //       uid: user.uid,
  //       content: Body.content,
  //       questionId: Body.questionId,
  //       date: Body.date,
  //       repcoment: [],
  //     };
  //     await new this.commentModel(postNe).save();
  //     return { message: 'saved' };
  //   } catch (err) {
  //     return { message: err };
  //   }
  // }
}
