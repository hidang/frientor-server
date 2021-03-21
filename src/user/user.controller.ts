import {
  Controller,
  Request,
  Post,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserDocument } from './schema/user.schema';
import { UserService } from './user.service';
@ApiTags('/user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  async register(@Request() request: Request): Promise<{ message: string }> {
    const user = request['user'];
    //user login with firebase?
    if (!user) {
      return { message: 'User does not register' };
    }
    return await this.userService.Register(user);
  }
  @Get('/:uid')
  @ApiParam({ name: 'uid', type: String })
  async GetUserByUid(@Param() params): Promise<UserDocument> {
    try {
      return this.userService.GetUserByUid(params.uid);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
