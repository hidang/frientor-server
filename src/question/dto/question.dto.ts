import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QuestionDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  date: Date;
}
