import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString } from 'class-validator';

export class ChatDto {
  @ApiProperty({ required: false })
  @Allow()
  _id: any;

  // @ApiProperty() //user 1 là user post -> create
  // @IsString()
  // uid1: string;
  @ApiProperty()
  @IsString()
  uid2: string;

  @ApiProperty()
  content: Array<any>;

  // @ApiProperty()
  // @IsString()
  // commentId: string;
}
