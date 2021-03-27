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
  CacheInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { CommentDto } from './dto/comment.dto';
import { QuestionDto } from './dto/question.dto';
import { RepCommentDto } from './dto/repComment.dto';
import { QuestionDocument } from './schema/question.schema';
import { RepCommentDocument } from './schema/repcomment.schema';

@ApiTags('/question')
@ApiBearerAuth()
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  //question
  @Get('/')
  @UseInterceptors(CacheInterceptor)
  async GetQuestionList(): Promise<QuestionDocument[]> {
    try {
      return this.questionService.GetAllQuestion();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @Get('/:id')
  @ApiParam({ name: 'id', type: String })
  async GetQuestioById(@Param() params): Promise<QuestionDocument[]> {
    try {
      return this.questionService.GetQuestionById(params?.id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
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
  @Get('comment/:idQuestion')
  @UseInterceptors(CacheInterceptor)
  @ApiParam({ name: 'idQuestion', type: String })
  async GetCommentList(@Param() params): Promise<QuestionDocument[]> {
    try {
      return this.questionService.GetAllCommentInQuestion(params.idQuestion);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @Post('comment/:idQuestion')
  @ApiParam({ name: 'idQuestion', type: String })
  async AddComment(
    @Request() request: Request,
    @Body() Body: CommentDto,
    @Param() params,
  ): Promise<{ message: string }> {
    const user = request['user'];
    if (!user) return { message: 'User not login' };
    try {
      return this.questionService.AddComment(user, Body, params.idQuestion);
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
  @UseInterceptors(CacheInterceptor)
  @Get('repcomment/:idComment')
  @ApiParam({ name: 'idComment', type: String })
  async GetAllRepCommentByIdComment(
    @Param() params,
  ): Promise<RepCommentDocument[]> {
    try {
      return this.questionService.GetAllRepCommentByIdComment(params.idComment);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

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
