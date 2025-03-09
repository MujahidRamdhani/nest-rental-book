import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../app.module';

describe('MemberController (e2e)', () => {
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

  it('GET /api/member - Get all members', async () => {
    const res = await request(app.getHttpServer()).get('/api/member');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /api/member - Create a member', async () => {
    const memberData = {
      code: 'M001',
      title: 'Angga',
    };

    const res = await request(app.getHttpServer())
      .post('/api/member')
      .send(memberData);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'M001',
          title: 'Angga',
        }),
      ]),
    );
  });

  it('GET /api/member/:code - Get member by code', async () => {
    const res = await request(app.getHttpServer()).get('/api/member/M001');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject({
      code: 'M001',
      title: 'Angga',
    });
  });
});
