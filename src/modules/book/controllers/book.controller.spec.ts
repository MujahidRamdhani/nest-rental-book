import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../app.module';

describe('BookController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/book - Get all books', async () => {
    const res = await request(app.getHttpServer()).get('/api/book');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /api/book - Create a book', async () => {
    const bookData = {
      code: 'code-991',
      title: 'Mysteries of the Universe',
      author: 'Albert Newton',
      stock: 10,
    };

    const res = await request(app.getHttpServer())
      .post('/api/book')
      .send(bookData);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'code-991',
          title: 'Mysteries of the Universe',
          author: 'Albert Newton',
          stock: 10,
        }),
      ]),
    );
  });

  it('GET /api/book/:code - Get book by code', async () => {
    const res = await request(app.getHttpServer()).get('/api/book/code-991');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject({
      code: 'code-991',
      title: 'Mysteries of the Universe',
      author: 'Albert Newton',
      stock: 10,
    });
  });
});
