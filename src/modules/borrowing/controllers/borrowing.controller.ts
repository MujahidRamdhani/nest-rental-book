import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Param, 
  Put 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiExtraModels } from '@nestjs/swagger';
import { BorrowingService } from '../services/borrowing.service';
import { BookService } from '@/modules/book/services/book.service';
import { MemberService } from '@/modules/member/services/member.service';
import { BorrowingResponseDto, CreateBorrowingDto } from '../dtos/create.dto';

@ApiTags('Borrowing')
@ApiExtraModels(BorrowingResponseDto) 
@Controller('borrowing')
export class BorrowingController {
  constructor(
    private borrowingService: BorrowingService, 
    private bookService: BookService,
    private memberService: MemberService
  ) {}

  /**
   * @swagger
   * /borrowing:
   *   post:
   *     summary: Borrow a book
   *     description: Allows a member to borrow a book.
   *     tags:
   *       - Borrowing
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               memberCode:
   *                 type: string
   *                 example: "M001"
   *               bookCode:
   *                 type: string
   *                 example: "SHR-1"
   *     responses:
   *       200:
   *         description: Book borrowed successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Book borrowed successfully"
   */
  @Post('/')
  @ApiOperation({ summary: 'Borrow a book' })
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        memberCode: { type: 'string', example: 'M001' },
        bookCode: { type: 'string', example: 'SHR-1' }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Book borrowed successfully',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Book borrowed successfully' }
          }
        }
      }
    }
  })
  async create(@Body() data: CreateBorrowingDto) {
    const book = await this.bookService.findOneByCode(data.bookCode);
    if (!book) throw new Error('Book not found');
    if (book.stock <= 0) throw new Error('Book out of stock');

    const member = await this.memberService.findOneByCode(data.memberCode);
    if (!member) throw new Error('Member not found');

    const borrowing = await this.borrowingService.create(data);
    if (!borrowing) throw new Error('Borrowing not found');

    await this.bookService.updateStock(data.bookCode, -1);

    return { message: 'Book borrowed successfully' };
  }

  /**
   * @swagger
   * /borrowing/{code}:
   *   put:
   *     summary: Return a borrowed book
   *     description: Marks a borrowed book as returned and updates the stock.
   *     tags:
   *       - Borrowing
   *     parameters:
   *       - in: path
   *         name: code
   *         required: true
   *         schema:
   *           type: string
   *         description: Borrowing transaction code.
   *     responses:
   *       200:
   *         description: Book returned successfully.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Book returned successfully"
   */
  @Put(':code')
  @ApiOperation({ summary: 'Return a borrowed book' })
  @ApiResponse({
    status: 200,
    description: 'Book returned successfully',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Book returned successfully' }
          }
        }
      }
    }
  })
  async returnBook(@Param('code') code: string) {
    const borrowing = await this.borrowingService.returnBook(code);
    if (!borrowing) throw new Error('Borrowing not found');

    await this.bookService.updateStock(borrowing.bookCode, 1);

    return { message: 'Book returned successfully' };
  }

    /**
   * @swagger
   * /borrowing:
   *   get:
   *     summary: Retrieve all 
   *     description: Retrieves a list of all Borrowings.
   *     tags:
   *       - Book
   *     responses:
   *       200:
   *         description: A list of books.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/ResponseBorrowingDto'
   */
    @Get('/')
    @ApiOperation({ summary: 'Retrieve all Borrowings' })
    @ApiResponse({
      status: 200,
      description: 'Successfully retrieved all Borrowings',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/ResponseBorrowingDto' }
          }
        }
      }
    })
    async getAll() {
      return this.borrowingService.getAllStatusBorrowing();
    }

}
