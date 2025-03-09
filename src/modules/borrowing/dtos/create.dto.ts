import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

export class CreateBorrowingDto {
  @ApiProperty({ example: 'member-001', description: 'Unique code for the member' })
  @IsString()
  memberCode: string;

  @ApiProperty({ example: 'book-991', description: 'Unique code for the book' })
  @IsString()
  bookCode: string;
}

export class CreatePenaltyDto {
  @ApiProperty({ example: 'member-001', description: 'Unique code for the member' })
  @IsString()
  memberCode: string;

  @ApiProperty({ example: 'borrowing-12345', description: 'ID of the borrowing record' })
  @IsString()
  borrowingId: string;

  @ApiProperty({ example: '2025-04-01T00:00:00.000Z', description: 'Expiration date of the penalty' })
  @IsDate()
  expiresAt: Date;
}

export class BorrowingResponseDto {
  @ApiProperty({ example: 'borrowing-12345', description: 'Unique ID of the borrowing record' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'member-001', description: 'Code of the member who borrowed the book' })
  @IsString()
  memberCode: string;

  @ApiProperty({ example: 'book-991', description: 'Code of the borrowed book' })
  @IsString()
  bookCode: string;

  @ApiProperty({ example: '2025-03-10T10:00:00.000Z', description: 'Date when the book was borrowed' })
  @IsDate()
  borrowedAt: Date;

  @ApiProperty({ example: '2025-03-20T10:00:00.000Z', description: 'Due date for returning the book' })
  @IsDate()
  dueDate: Date;

  @ApiProperty({ example: false, description: 'Status of book return' })
  @IsBoolean()
  isReturned: boolean;
}
