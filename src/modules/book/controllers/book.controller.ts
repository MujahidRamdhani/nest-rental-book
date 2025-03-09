import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiExtraModels } from '@nestjs/swagger';
import { BookService } from '../services/book.service';
import { BookResponseDto, CreateBookDto } from '../dtos/create.dto';

@ApiTags('Book')
@ApiExtraModels(BookResponseDto) 
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /**
   * @swagger
   * /book:
   *   get:
   *     summary: Retrieve all books
   *     description: Fetches a list of all available books in the library.
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
   *                 $ref: '#/components/schemas/BookResponseDto'
   */
  @Get('/')
  @ApiOperation({ summary: 'Retrieve all books' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved list of books',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { $ref: '#/components/schemas/BookResponseDto' }
        }
      }
    }
  })
  async getAll() {
    return this.bookService.getAll();
  }

  /**
   * @swagger
   * /book/{code}:
   *   get:
   *     summary: Retrieve a book by code
   *     description: Fetches a book using its unique code.
   *     tags:
   *       - Book
   *     parameters:
   *       - in: path
   *         name: code
   *         required: true
   *         schema:
   *           type: string
   *         description: The unique code of the book.
   *     responses:
   *       200:
   *         description: Successfully retrieved book data.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BookResponseDto'
   */
  @Get(':code')
  @ApiOperation({ summary: 'Retrieve a book by code' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved book data',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/BookResponseDto' }
      }
    }
  })
  async findOneById(@Param('code') code: string) {
    return this.bookService.findOneByCode(code);
  }

  /**
   * @swagger
   * /book:
   *   post:
   *     summary: Create a new book
   *     description: Adds a new book to the inventory.
   *     tags:
   *       - Book
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateBookDto'
   *     responses:
   *       201:
   *         description: Successfully created a new book.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BookResponseDto'
   */
  @Post('/')
  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({
    required: true,
    schema: { $ref: '#/components/schemas/CreateBookDto' }
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new book',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/BookResponseDto' }
      }
    }
  })
  async create(@Body() data: CreateBookDto) {
    return this.bookService.create(data);
  }
}
