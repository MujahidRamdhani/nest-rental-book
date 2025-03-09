import { TransformResponseInterceptor } from '@/interceptors/response.interceptor';
import { ApiCustomHeader } from '@/shared/swagger/decorator';
import {
  Controller,
  UseGuards,
  UseInterceptors,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Router } from 'nestjs-trpc';
import { ApiTags } from '@nestjs/swagger';
import { BookService } from '../services/book.service';
import { CreateBookDto, UpdateBookDto } from '../dtos/create.dto';


@ApiTags('Book')
@ApiCustomHeader()
@UseInterceptors(TransformResponseInterceptor)
@Controller('book')
@Router({ alias: 'book' })
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('/')
  async getAll() {
    return this.bookService.getAll();
  }

  @Get(':code')
  async findOneById(@Param('code') code: string) {
    return this.bookService.findOneByCode(code);
  }

  @Post('/')
  async create(@Body() data: CreateBookDto) {
    return this.bookService.create(data);
  }


}
