import { Injectable } from "@nestjs/common";
import { BookRepository } from "../repositories/book.repository";
import { CreateBookDto} from "../dtos/create.dto";


@Injectable()
export class BookService {
    constructor(private readonly bookRepository: BookRepository) { }

    async getAll() {
        return this.bookRepository.getAll();
    }

    async create(data: CreateBookDto) {
        const book = await this.bookRepository.findOneByCode(data.code);
        if (book) throw new Error('Code Book already exists');
        return this.bookRepository.create(data);
    }

    async findOneByCode(code: string) {
        return this.bookRepository.findOneByCode(code);
    }

    async updateStock(code: string, count : number) {
        const book = await this.bookRepository.findOneByCode(code);
        const countStock = book.stock + count;

        return this.bookRepository.updateStock(code, countStock);
    }
}