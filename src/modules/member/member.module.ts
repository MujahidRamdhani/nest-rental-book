import { Module } from "@nestjs/common";
import { MemberController } from "./controllers/member.controller";
import { MemberService } from "./services/member.service";
import { MemberRepository } from "./repositories/member.repository";



@Module({
    imports: [],
    controllers: [
        MemberController,
    ],
    providers: [MemberService, MemberRepository]
})
export class MemberModule { }