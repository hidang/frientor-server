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
    //console.log(request.body);
    const user = request['user'];
    //const user = request.body;
    //console.log(request['user']);
    const result = await this.userService.Register(user);
    if (result) return { message: 'saved user' };
    else return { message: 'user đã tồn tại hoặc không hợp lệ' };
  }
}
