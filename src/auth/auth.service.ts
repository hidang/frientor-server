import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // async GenerateToken(user: UserDocument): Promise<string> {
  //   const payload = { userId: user._id, username: user.username };
  //   return this.jwtService.sign(payload);
  // }
}
