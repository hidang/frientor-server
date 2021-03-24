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
import { ChatDocument } from './schema/chat.schema';

@ApiTags('/chat')
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Get('/')
  @ApiParam({ name: 'idComment', type: String })
  async GetChithubOfUserInComment(
    @Request() request: Request,
    @Param() params,
  ): Promise<any> {
    const user = request['user'];
    if (!user) return { message: 'User does not login' };
    try {
      return this.chatService.GetChithubOfUserInComment(
        user?.uid,
        params.IdComment,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @Post('/')
  @ApiParam({ name: 'idComment', type: String })
  async CreateChithubOfUserInComment(
    @Request() request: Request,
    @Param() params,
    @Body() Body: ChatDto,
  ): Promise<any> {
    const user = request['user'];
    if (!user) return { message: 'User does not login' };
    try {
      return this.chatService.CreateChithubOfUserInComment(
        user?.uid,
        params.idComment,
        Body,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
