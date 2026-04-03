import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

export function sampleDb(): string {
    const adapter = new PrismaPg(
        {
            connectionString: process.env.DATABASE_URL,
            max: 20,
            connectionTimeoutMillis: 2000,
            idleTimeoutMillis: 30000,
            maxUses: 7500,
            statement_timeout: 1000,
        },
        { schema: 'sample' },
    );
    new PrismaClient({ adapter });

    return 'sampleDb';
}
