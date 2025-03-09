import { PrismaService } from '@/shared/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { CreateBookDto} from '../dtos/create.dto';

@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.book.findMany();
  }

  async findOneByCode(code: string) {
    try {
      return await this.prisma.book.findFirst({ where: { code } });
    } catch (error) {
      throw error;
    }
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

  async updateStock(code: string, stock: number) {
    try {
      return await this.prisma.$transaction([
        this.prisma.book.update({ where: { code }, data: { stock } }),
      ]);
    } catch (error) {
      throw error;
    }
  }




}