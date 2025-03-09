import { Injectable } from "@nestjs/common";
import { BorrowingRepository } from "../repositories/borrowing.repository";
import { CreateBorrowingDto, CreatePenaltyDto } from "../dtos/create.dto";
import { PenaltyRepository } from "../repositories/penalty.repository";

@Injectable()
export class BorrowingService {
    constructor(
        private readonly borrowingRepository: BorrowingRepository,
        private readonly penaltyRepository: PenaltyRepository
    ) { }

    async getAll() {
        return this.borrowingRepository.getAll();
    }

    async create(data: CreateBorrowingDto) {
        const { memberCode } = data;
        const penalty = await this.penaltyRepository.findOneByMemberCode(memberCode);
    
        if (penalty && penalty.expiresAt < new Date()) throw new Error('Member has penalty');
   
        const borrowing = await this.borrowingRepository.getAllByCodeMemberStatusBorrowing(memberCode);
        
        if (borrowing.length >= 2) throw new Error('Member has borrowing');
    
        return this.borrowingRepository.create(data);
    }

    async returnBook(id: string) {
        

        const borrowing = await this.borrowingRepository.findOneById(id);
        if (!borrowing) throw new Error('borrowing not found');
        
        //check if the book has been returned
        if (borrowing.status === 'RETURNED') throw new Error('Books have been returned');

        //returning books
        const returnedAt = new Date(); 
        const [returnBook] = await this.borrowingRepository.returnBook(id, returnedAt);
        const { memberCode, id: borrowingId, borrowedAt} = returnBook;
        
        if (!borrowingId) throw new Error('borrowing not found');
        
        const borrowedTime = borrowedAt.getTime();
        const returnedTime = returnedAt.getTime();

        //Calculate the time difference if it is more than 3 days, it will be penalized.
        const diffInDays   = (returnedTime - borrowedTime) / (1000 * 60 * 60 * 24); 

        //length of penalty time
        const expiresAt    = new Date(returnedTime + 1000 * 60 * 60 * 24 * 3)
        
        if (diffInDays > 3) {
            await this.penaltyRepository.create({
                memberCode,
                borrowingId,
                expiresAt, 
            });
        }

        return returnBook;
    }

    async getAllStatusBorrowing() {
        return this.borrowingRepository.getAllStatusBorrowing();
    }

}