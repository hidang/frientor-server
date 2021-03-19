import {
  Controller,
  Request,
  Post,
  Get,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { CommentDto } from './dto/comment.dto';
import { QuestionDto } from './dto/question.dto';

@ApiTags('/question')
@ApiBearerAuth()
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  //test
  // @Post('hello')
  // getHello(@Request() request: Request) {
  //   return {
  //     hi: 'Hello ' + request['user']?.email + '!',
  //     user: request['user'],
  //   };
  // }
  @Post('question')
  async AddQuestion(
    @Request() request: Request,
    @Body() Body: QuestionDto,
  ): Promise<{ message: string }> {
    try {
      const user = request['user'];
      return this.questionService.AddQuestion(user, Body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('comment')
  async AddCommpent(
    @Request() request: Request,
    @Body() Body: CommentDto,
  ): Promise<{ message: string }> {
    try {
      const user = request['user'];
      return this.questionService.AddComment(user, Body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
