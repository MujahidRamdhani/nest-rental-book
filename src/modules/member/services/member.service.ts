import { Injectable } from "@nestjs/common";
import { MemberRepository } from "../repositories/member.repository";
import { CreateMemberDto } from "../dtos/create.dto";



@Injectable()
export class MemberService {
    constructor(private readonly memberRepository: MemberRepository) { }

    async getAll() {
        return this.memberRepository.getAll();
    }

    async create(data: CreateMemberDto) {
        return this.memberRepository.create(data);
    }


    async findOneByCode(code: string) {
        return this.memberRepository.findOneByCode(code);
    }
}