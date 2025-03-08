import { Module } from "@nestjs/common";
import { BookController } from "./controllers/book.controller";
import { BookService } from "./services/book.service";
import { BookRepository } from "./repositories/book.repository";

@Module({
    imports: [],
    controllers: [
        BookController,
    ],
    providers: [BookService, BookRepository]
})
export class BookModule { }