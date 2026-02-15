import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../client/client.js';

export async function sample() {
    const connectionString = `${process.env.DATABASE_URL}`;
    const adapter = new PrismaPg({ connectionString });
    const prisma = new PrismaClient({ adapter });

    return await prisma.user.findMany();
}
