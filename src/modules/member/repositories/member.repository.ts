import { PrismaService } from '@/shared/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from '../dtos/create.dto';

@Injectable()
export class MemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.member.findMany();
  }

  async create(data: CreateMemberDto) {
    try {
      return await this.prisma.$transaction([
        this.prisma.member.create({ data }),
      ]);
    } catch (error) {
      throw error;
    }
  }


  async findOneByCode(code: string) {
    try {
      return await this.prisma.member.findFirst({ where: { code } });
    } catch (error) {
      throw error;
    }
  }
}