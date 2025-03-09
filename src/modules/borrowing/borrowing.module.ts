import { Module } from "@nestjs/common";
import { BorrowingRepository } from "./repositories/borrowing.repository";
import { BorrowingService } from "./services/borrowing.service";
import { BorrowingController } from "./controllers/borrowing.controller";
import { PenaltyRepository } from "./repositories/penalty.repository";
import { BookModule } from "../book/book.module";
import { MemberModule } from "../member/member.module";


@Module({
    imports: [
        BookModule,
        MemberModule
    ], 
    controllers: [BorrowingController],
    providers: [
        BorrowingService, 
        BorrowingRepository,
        PenaltyRepository,
    ],
})
export class BorrowingModule { }
