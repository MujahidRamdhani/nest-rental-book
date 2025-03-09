import { Injectable } from "@nestjs/common";
import { BookRepository } from "../repositories/book.repository";
import { CreateBookDto, UpdateBookDto } from "../dtos/create.dto";


@Injectable()
export class BookService {
    constructor(private readonly bookRepository: BookRepository) { }

    async getAll() {
        return this.bookRepository.getAll();
    }

    async create(data: CreateBookDto) {
        return this.bookRepository.create(data);
    }

    async findOneByCode(code: string) {
        return this.bookRepository.findOneByCode(code);
    }
}