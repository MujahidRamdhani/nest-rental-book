import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty()
  @IsString()
  code: string;
  @IsString()
  name: string;
}
