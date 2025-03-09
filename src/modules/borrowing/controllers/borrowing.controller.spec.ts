import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../app.module';


describe('BorrowingController (e2e)', () => {
  let app: INestApplication;
  let borrowingId: string;

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

  it('GET /api/borrowing - Get all borrowings', async () => {
    const res = await request(app.getHttpServer()).get('/api/borrowing');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /api/borrowing - Create a borrowing', async () => {
    const borrowingData = {
      memberCode: 'code-011',
      bookCode: 'code-122',
    };

    const res = await request(app.getHttpServer())
      .post('/api/borrowing')
      .send(borrowingData);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);

   
    borrowingId = res.body.data[0].id;
  });

  it('GET /api/borrowing/:id - Get borrowing by ID', async () => {
    const res = await request(app.getHttpServer()).get(`/api/borrowing/${borrowingId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject({
      id: borrowingId,
      memberCode: 'code-011',
      bookCode: 'code-122',
      status: 'BORROWED',
    });
  });

  it('PUT /api/borrowing/:id - Return borrowed book', async () => {
    const res = await request(app.getHttpServer())
      .put(`/api/borrowing/${borrowingId}`)
      .send({});

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject({
      id: borrowingId,
      status: 'RETURNED',
    });
  });
});
