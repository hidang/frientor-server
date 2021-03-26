import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChatContentDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  date: Date;
}
