import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsString()
  uid: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  name: any;

  @ApiProperty()
  @IsString()
  photoURL: any;

  @ApiProperty()
  @IsString()
  bio: any;

  @ApiProperty()
  @IsString()
  location: Array<any>;
}
