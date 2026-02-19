import 'dotenv/config';
import assert from 'node:assert';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../client/client.js';

export async function sample() {
    const connectionString = `${process.env.DATABASE_URL}`;
    const adapter = new PrismaPg({ connectionString });
    const prisma = new PrismaClient({ adapter });

    assert.ok(prisma);
}
