import { PrismaService } from '@/shared/prisma/prisma.service';

import { Injectable } from '@nestjs/common';
import { CreatePenaltyDto } from '../dtos/create.dto';
;


@Injectable()
export class PenaltyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByMemberCode(memberCode: string) {
    try {
      return await this.prisma.penalty.findFirst({ where: { memberCode } });
    } catch (error) {
      throw error;
    }
  }

  async create(data: CreatePenaltyDto) {
    try {
      return await this.prisma.$transaction([
        this.prisma.penalty.create({ data }),
      ]);
    } catch (error) {
      throw error;
    }
  }


}