import { PrismaService } from '@/shared/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from '../dtos/create.dto';

@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.book.findMany();
  }

  async findOneById(code : string) {
    return this.prisma.book.findFirst({ where: { code } });
  }

  async create(data: CreateBookDto) {
    try {
      console.log(data);
      return await this.prisma.$transaction([
        this.prisma.book.create({ data }),
      ]);
    } catch (error) {
      throw error;
    }
  }

  async update(code: string, data: UpdateBookDto) {
    try {
      return await this.prisma.$transaction([
        this.prisma.book.update({ where: { code }, data }),
      ]);
    } catch (error) {
      throw error;
    }
  }

  async destroy(code: string) {
    try {
      return await this.prisma.book.delete({ where: { code } });
    } catch (error) {
      throw error;
    }
  }

  async findOneByCode(code: string) {
    try {
      return await this.prisma.book.findFirst({ where: { code } });
    } catch (error) {
      throw error;
    }
  }
}