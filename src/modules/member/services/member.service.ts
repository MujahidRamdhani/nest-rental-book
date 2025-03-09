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
        const member = await this.memberRepository.findOneByCode(data.code);
        if (member) throw new Error('Code Member already exists');
        return this.memberRepository.create(data);
    }

    async findOneByCode(code: string) {
        return this.memberRepository.findOneByCode(code);
    }
}