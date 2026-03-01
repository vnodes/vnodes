import { Inject, type Provider, type Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

export const DEFAULT_PRISMA_CLIENT_SCOPE = 'DEFAULT';

export function getPrismaClientToken(scope = DEFAULT_PRISMA_CLIENT_SCOPE) {
    return `${scope}_PRISMA_CLIENT_TOKEN`.toUpperCase();
}

export function providePrismaClient<PrismaClient>(
    prismaClientClass: Type<PrismaClient>,
    _extentions: ((client: PrismaClient) => PrismaClient)[],
    scope = DEFAULT_PRISMA_CLIENT_SCOPE,
): Provider {
    return {
        inject: [ConfigService],
        provide: getPrismaClientToken(scope),
        useFactory(config: ConfigService) {
            const connectionString = config.getOrThrow('DATABASE_URL');
            const pool = new Pool({
                connectionString,
                max: 20,
                connectionTimeoutMillis: 2000,
                idleTimeoutMillis: 30000,
                maxUses: 7500,
            });

            const adapter = new PrismaPg(pool);

            const prismaClient = new prismaClientClass({ adapter });

            return prismaClient;
        },
    };
}

export function InjectPrismaClient(scope = DEFAULT_PRISMA_CLIENT_SCOPE): ParameterDecorator {
    return (...args) => {
        Inject(getPrismaClientToken(scope))(...args);
    };
}
