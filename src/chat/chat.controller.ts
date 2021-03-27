import {
  BadRequestException,
  Controller,
  Get,
  Request,
  Body,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { ChatContentDto } from './dto/chatContent.dto';
import { ChatDocument } from './schema/chat.schema';

@ApiTags('/chat')
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Get('/:idComment')
  @ApiParam({ name: 'idComment', type: String })
  async GetChatInfoOfUserInComment(
    @Request() request: Request,
    @Param() params,
  ): Promise<any> {
    const user = request['user'];
    if (!user) return { message: 'User does not login' };
    try {
      return this.chatService.GetChatInfoOfUserInComment(
        user?.uid,
        params.idComment,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @Get('content/:idChat')
  @ApiParam({ name: 'idChat', type: String })
  async GetChatContentOfUserInComment(
    @Request() request: Request,
    @Param() params,
  ): Promise<any> {
    const user = request['user'];
    if (!user) return { message: 'User does not login' };
    try {
      return this.chatService.GetChatContentOfUserInComment(
        user?.uid,
        params.idChat,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @Post('/:idComment')
  @ApiParam({ name: 'idComment', type: String })
  async CreateChatOfUserInComment(
    @Request() request: Request,
    @Param() params,
    @Body() Body: ChatDto,
  ): Promise<any> {
    const user = request['user'];
    if (!user) return { message: 'User does not login' };
    try {
      return this.chatService.CreateChatOfUserInComment(
        user?.uid,
        params.idComment,
        Body,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('/content/:idChat')
  @ApiParam({ name: 'idChat', type: String })
  async AddChatContent(
    @Request() request: Request,
    @Param() params,
    @Body() Body: ChatContentDto,
  ): Promise<any> {
    const user = request['user'];
    if (!user) return { message: 'User does not login' };
    try {
      return this.chatService.AddChatContent(user, params.idChat, Body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
