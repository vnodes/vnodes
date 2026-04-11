import { Test } from '@nestjs/testing';
import type { INestApplication } from '@vnodes/nestjs/common';
import type { Any } from '@vnodes/types';
import request from 'supertest';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    
    let app: INestApplication;
    const appService: Record<keyof AppService, () => Any> = {
        hello() {
            return { test: 'test' };
        },
    };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        })
            .overrideProvider(AppService)
            .useValue(appService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET hello`, async () => {
        const res = await request(app.getHttpServer()).get('/hello');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(appService.hello());
    });

    afterAll(async () => {
        await app.close();
    });
});
