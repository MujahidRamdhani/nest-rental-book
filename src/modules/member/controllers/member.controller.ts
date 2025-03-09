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
import { MemberService } from '../services/member.service';
import { CreateMemberDto } from '../dtos/create.dto';



@ApiTags('Member')
@ApiCustomHeader()
@UseInterceptors(TransformResponseInterceptor)
@Controller('member')
@Router({ alias: 'member' })
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get('/')
  async getAll() {
    return this.memberService.getAll();
  }

  @Get(':code')
  async findOneByCode(@Param('code') code: string) {
    return this.memberService.findOneByCode(code);
  }

  @Post('/')
  async create(@Body() data: CreateMemberDto) {
    // console.log("debug", data);
    return this.memberService.create(data);
  }


}
