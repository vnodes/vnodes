import { Inject, type Provider, type Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

export const DEFAULT_PRISMA_CLIENT_SCOPE = 'DEFAULT';

export function getPrismaClientToken(scope = DEFAULT_PRISMA_CLIENT_SCOPE) {
    return `${scope}_PRISMA_CLIENT_TOKEN`;
}

export function providePrismaClient(prismaClientClass: Type, scope = DEFAULT_PRISMA_CLIENT_SCOPE): Provider {
    return {
        inject: [ConfigService],
        provide: getPrismaClientToken(scope),
        useFactory(config: ConfigService) {
            let connectionString = config.getOrThrow('DATABASE_URL');

            const sqliteConfigs: string[] = [];

            if (!connectionString.includes('_journal_mode=WAL')) {
                sqliteConfigs.push('_journal_mode=WAL');
            }

            if (!connectionString.includes('_synchronous=NORMAL')) {
                sqliteConfigs.push('_synchronous=NORMAL');
            }

            connectionString = `${connectionString}?${sqliteConfigs.join('&')}`;

            const adapter = new PrismaBetterSqlite3(
                {
                    url: connectionString,
                    timeout: 5000,
                },
                {
                    timestampFormat: 'iso8601',
                },
            );

            return new prismaClientClass({ adapter });
        },
    };
}

export function InjectPrismaClient(scope = DEFAULT_PRISMA_CLIENT_SCOPE): ParameterDecorator {
    return (...args) => {
        Inject(getPrismaClientToken(scope))(...args);
    };
}
