import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { QuestionDto } from './dto/question.dto';
import { Question, QuestionDocument } from './schema/question.schema';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}

  async Register(user): Promise<boolean> {
    const _user = await this.userModel.findOne({ uid: user.uid });
    if (_user) {
      return false;
    }
    try {
      await new this.userModel(user).save();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async AddPost(user: any, Body: QuestionDto): Promise<{ message: string }> {
    try {
      const uid = user.uid;
      const postNe: Question = {
        uid: uid,
        content: Body.content,
        date: Body.date,
      };
      await new this.questionModel(postNe).save();

      return { message: 'ok' };
    } catch (err) {
      return { message: err };
    }
  }
}
