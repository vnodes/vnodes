import { Inject, type Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import type { Cls } from '@vnodes/types';
import { Pool } from 'pg';

export const DEFAULT_PRISMA_CLIENT_SCOPE = 'DEFAULT';

export function getPrismaClientToken(scope = DEFAULT_PRISMA_CLIENT_SCOPE) {
    return `${scope}_PRISMA_CLIENT_TOKEN`;
}

export function providePrismaClient(prismaClientClass: Cls, scope = DEFAULT_PRISMA_CLIENT_SCOPE): Provider {
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

            return new prismaClientClass({ adapter });
        },
    };
}

export function InjectPrismaClient(scope = DEFAULT_PRISMA_CLIENT_SCOPE): ParameterDecorator {
    return (...args) => {
        Inject(getPrismaClientToken(scope))(...args);
    };
}
