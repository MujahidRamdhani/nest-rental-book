import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'code-991', description: 'Kode unik buku' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'Mysteries of the Universe', description: 'Title book' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Albert Newton', description: 'Name author' })
  @IsString()
  author: string;

  @ApiProperty({ example: 10, description: 'Count stock book' })
  @IsInt()
  stock: number;
}

export class BookResponseDto {
  @ApiProperty({ example: 'code-991', description: 'Kode unik buku' })
  code: string;

  @ApiProperty({ example: 'Mysteries of the Universe', description: 'Title book' })
  title: string;

  @ApiProperty({ example: 'Albert Newton', description: 'Name author' })
  author: string;

  @ApiProperty({ example: 10, description: 'Count stock book' })
  stock: number;
}


export class UpdateBookStockDto {
  @ApiProperty({ example: '10', description: 'stock buku' })
  @IsInt()
  stock: number;
}