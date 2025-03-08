import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  code: string;
  @IsString()
  title: string;
  @IsString()
  author: string;
  @IsInt()
  stock: number;
}

export class UpdateBookDto {
  @ApiProperty()
  @IsString()
  title: string;
  @IsString()
  author: string;
  @IsInt()
  stock: number;
}