import assert from 'node:assert/strict';
import test, { after, before, describe } from 'node:test';
import { inspect } from 'node:util';
import { Test } from '@nestjs/testing';
import { GlobalValidationPipe } from '@vnodes/nestjs';
import { INestApplication } from '@vnodes/nestjs/common';
import { ContactScalarFieldEnum } from '../prisma/internal/prismaNamespace.js';
import { ContactCreateInput, ContactUpdateInput } from '../prisma/models.js';
import { QueryMany } from '../prisma/services.js';
import { ContactController } from './contact.controller.js';
import { ContactService } from './contact.service.js';

class MockContactService {
    findMany(query: QueryMany<ContactScalarFieldEnum>) {
        return { query };
    }

    findOneById(id: number) {
        return { id };
    }
    createOne(data: ContactCreateInput) {
        return { data };
    }
    updateOneById(id: number, data: ContactUpdateInput) {
        return { id, data };
    }
    deleteOneById(id: number) {
        return { id };
    }
}

describe('AppModule', () => {
    let app: INestApplication;
    let baseUrl: string;

    before(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [ContactController],
            providers: [ContactService],
        })
            .overrideProvider(ContactService)
            .useClass(MockContactService)
            .compile();
        app = moduleRef.createNestApplication();

        app.useGlobalPipes(GlobalValidationPipe);
        await app.listen(0); // Listen on a random available port

        const address = app.getHttpServer().address();
        baseUrl = `http://localhost:${address.port}`;
    });

    after(async () => {
        await app.close();
    });

    test('GET /api/contacts', async () => {
        const response = await fetch(`${baseUrl}/contacts?orderBy=id&orderDir=asc`);
        const body = await response.json();

        console.log(inspect(body, true, 100));
        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(body.query, {});
    });
});
