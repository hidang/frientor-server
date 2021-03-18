import {
  Controller,
  Request,
  Post,
  Get,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { QuestionDto } from './dto/question.dto';
import { CommentDto } from './dto/comment.dto';
@ApiTags('/user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  //test
  // @Post('hello')
  // getHello(@Request() request: Request) {
  //   return {
  //     hi: 'Hello ' + request['user']?.email + '!',
  //     user: request['user'],
  //   };
  // }
  @Post('/register')
  async register(@Request() request: Request): Promise<{ message: string }> {
    //console.log(request.body);
    const user = request['user'];
    //const user = request.body;
    console.log(request['user']);
    const result = await this.userService.Register(user);
    //console.log(user, result)
    if (result) return { message: 'saved user' };
    else return { message: 'user đã tồn tại hoặc không hợp lệ' };
  }

  @Post('question')
  async AddTodo(
    @Request() request: Request,
    @Body() Body: QuestionDto,
  ): Promise<{ message: string }> {
    try {
      const user = request['user'];
      return this.userService.AddPost(user, Body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // @Post('comment')
  // async AddCommpent(
  //   @Request() request: Request,
  //   @Body() Body: CommentDto,
  // ): Promise<{ message: string }> {
  //   try {
  //     const user = request['user'];
  //     return this.userService.AddCommpent(user, Body);
  //   } catch (error) {
  //     throw new BadRequestException(error);
  //   }
  // }
}
