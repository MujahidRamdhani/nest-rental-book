import { PrismaService } from '@/shared/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { CreateBorrowingDto } from '../dtos/create.dto';
import { BorrowingStatus } from "@prisma/client";

@Injectable()
export class BorrowingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.borrowing.findMany();
  }

  async findOneById(id: string) {
    try {
      return await this.prisma.borrowing.findFirst({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async create(data: CreateBorrowingDto) {
    try {
      console.log(data);
      return await this.prisma.$transaction([
        this.prisma.borrowing.create({ data }),
      ]);
    } catch (error) {
      throw error;
    }
  }

  async returnBook(id: string, returnedAt: Date) {
    try {
      return await this.prisma.$transaction([
        this.prisma.borrowing.update({ where: { id }, data: { returnedAt: returnedAt, status: BorrowingStatus.RETURNED } }),
      ]);
    } catch (error) {
      throw error;
    }
  }

  async getAllByCodeMemberStatusBorrowing(memberCode: string) {
    try {
      return await this.prisma.borrowing.findMany({ where: { memberCode, status: BorrowingStatus.BORROWED} });
    } catch (error) {
      throw error;
    }
  }

  async getAllStatusBorrowing() {
    try {
      return await this.prisma.borrowing.findMany({ where: { status: BorrowingStatus.BORROWED} });
    } catch (error) {
      throw error;
    }
  }
  

}