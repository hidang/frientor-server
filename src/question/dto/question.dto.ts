import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString } from 'class-validator';

export class QuestionDto {
  @ApiProperty({ required: false })
  @Allow()
  _id: any;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  date: Date;
}