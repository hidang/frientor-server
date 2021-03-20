import {
  Controller,
  Request,
  Post,
  Get,
  Body,
  BadRequestException,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { CommentDto } from './dto/comment.dto';
import { QuestionDto } from './dto/question.dto';
import { RepCommentDto } from './dto/repComment.dto';

@ApiTags('/question')
@ApiBearerAuth()
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  //question
  @Post('/')
  async AddQuestion(
    @Request() request: Request,
    @Body() Body: QuestionDto,
  ): Promise<{ message: string }> {
    const user = request['user'];
    if (!user) return { message: 'User does not login' };
    try {
      return this.questionService.AddQuestion(user, Body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put('/')
  async EditQuestion(
    @Request() request: Request,
    @Body() Body: QuestionDto,
  ): Promise<{ message: string }> {
    const user = request['user'];
    if (!user) return { message: 'User does not login' };
    try {
      return this.questionService.EditQuestion(user, Body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', type: String })
  async DeleteQuestion(
    @Request() request: Request,
    @Param() params,
  ): Promise<{ message: string }> {
    const user = request['user'];
    if (!user) return { message: 'User does not login' };
    try {
      return this.questionService.DeleteQuestion(user, params.id);
    } catch (error) {
      //catch
      throw new BadRequestException(error);
    }
  }

  //comment
  @Post('comment')
  async AddComment(
    @Request() request: Request,
    @Body() Body: CommentDto,
  ): Promise<{ message: string }> {
    const user = request['user'];
    if (!user) return { message: 'User not login' };
    try {
      return this.questionService.AddComment(user, Body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put('comment')
  async EditComment(
    @Request() request: Request,
    @Body() Body: CommentDto,
  ): Promise<{ message: string }> {
    const user = request['user'];
    if (!user) return { message: 'User does not login' };
    try {
      return this.questionService.EditComment(user, Body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete('comment/:id')
  @ApiParam({ name: 'id', type: String })
  async DeleteComment(
    @Request() request: Request,
    @Param() params,
  ): Promise<{ message: string }> {
    const user = request['user'];
    if (!user) return { message: 'User does not login' };
    try {
      return this.questionService.DeleteComment(user, params.id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  //repcomment
  @Post('repcomment/:idComment')
  @ApiParam({ name: 'idComment', type: String })
  async AddRepComment(
    @Request() request: Request,
    @Body() Body: RepCommentDto,
    @Param() params,
  ): Promise<{ message: string }> {
    const user = request['user'];
    if (!user) return { message: 'User does not login' };
    try {
      return this.questionService.AddRepComment(user, Body, params.idComment);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @Put('repcomment')
  async EditRepComment(
    @Request() request: Request,
    @Body() Body: RepCommentDto,
  ): Promise<{ message: string }> {
    const user = request['user'];
    if (!user) return { message: 'User does not login' };
    if (!Body._id) return { message: '_id wrong' };
    try {
      return this.questionService.EditRepComment(user, Body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @Delete('repcomment/:id')
  @ApiParam({ name: 'id', type: String })
  async DeleteRepComment(
    @Request() request: Request,
    @Param() params,
  ): Promise<{ message: string }> {
    const user = request['user'];
    if (!user) return { message: 'User does not login' };
    try {
      return this.questionService.DeleteRepComment(user, params.id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
