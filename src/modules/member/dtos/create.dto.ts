import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({ example: 'member-001', description: 'Unique code for the member' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'John Doe', description: 'Name of the member' })
  @IsString()
  name: string;
}

export class MemberResponseDto {
  @ApiProperty({ example: 'member-001', description: 'Unique code for the member' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'John Doe', description: 'Name of the member' })
  @IsString()
  name: string;
}
