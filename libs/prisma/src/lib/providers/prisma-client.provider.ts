import { type FactoryProvider, Inject, type Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { DI, Env } from '@vnodes/env';
import { definedOrThrow, diToken } from '@vnodes/utils';

export function prismaClientToken(profile = '') {
    return diToken(DI.DB_CLIENT, profile);
}

export function providePrismaClient<PrismaClient>(client: Type<PrismaClient>, profile = ''): FactoryProvider {
    return {
        inject: [ConfigService],
        provide: prismaClientToken(profile),
        useFactory(config: ConfigService) {
            const env = new Env(profile);

            const conf = <T>(key: string, defaultValue?: T) => {
                return definedOrThrow<T>(config.get<T | undefined>(key), defaultValue);
            };
            const sconf = (key: string, defaultValue?: string) => conf<string>(key, defaultValue);
            const nconf = (key: string, defaultValue?: number) => Number(conf<number>(key, defaultValue));

            const connectionString = sconf(env.DB_URL);
            const schema = sconf(env.DB_SCHEMA);
            const max = nconf(env.DB_POOL_MAX, 20);
            const connectionTimeoutMillis = nconf(env.DB_POOL_CONNECTION_TIMEOUT_MILLIS, 60_000);
            const idleTimeoutMillis = nconf(env.DB_POOL_IDLE_TIMEOUT_MILLIS, 60_000);
            const maxUses = nconf(env.DB_POOL_MAX_USES, 7_500);
            const statement_timeout = nconf(env.DB_POOL_STATEMENT_TIMEOUT, 1_000);
            const query_timeout = nconf(env.DB_POOL_QUERY_TIMEOUT, 1_000);
            const lock_timeout = nconf(env.DB_POOL_LOCK_TIMEOUT, 1_000);

            const adapter = new PrismaPg(
                {
                    connectionString,
                    max,
                    connectionTimeoutMillis,
                    idleTimeoutMillis,
                    maxUses,
                    statement_timeout,
                    query_timeout,
                    lock_timeout,
                },
                { schema },
            );
            return new client({ adapter });
        },
    };
}

export function InjectPrismaClient(profile = ''): ParameterDecorator {
    return (...args) => {
        Inject(prismaClientToken(profile))(...args);
    };
}
