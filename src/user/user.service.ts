import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getHello(email: string): string {
    return 'Hello ' + email + '!';
  }
}
