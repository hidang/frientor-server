import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RepCommentDto {
  @ApiProperty()
  @IsString()
  uid: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  date: Date;
}
