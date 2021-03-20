import { Controller, Request, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
}
