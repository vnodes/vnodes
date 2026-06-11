import { type FactoryProvider, Inject, type Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Env } from '@vnodes/types';

export const DEFAULT_PRISMA_CLIENT_NAME = 'default';

export function prismaClientToken(name: string = DEFAULT_PRISMA_CLIENT_NAME) {
  return `${name}_PRISMA_CLIENT`.toUpperCase();
}

export function providePrismaClient<PrismaClient>(
  client: Type<PrismaClient>,
  name: string = DEFAULT_PRISMA_CLIENT_NAME,
): FactoryProvider {
  return {
    inject: [ConfigService],
    provide: prismaClientToken(name),
    useFactory(config: ConfigService) {
      const conf = <T>(key: string, defaultValue?: T) => {
        const value = config.get<T | undefined>(key);

        if (!value) {
          if (defaultValue) {
            return defaultValue;
          }
          throw new Error(`${key} is  not provided in .env`);
        }
        return value;
      };
      const sconf = (key: string, defaultValue?: string) =>
        conf<string>(key, defaultValue);
      const nconf = (key: string, defaultValue?: number) =>
        Number(conf<number>(key, defaultValue));

      const connectionString = sconf(Env.DB_URL);
      const schema = sconf(Env.DB_SCHEMA);
      const max = nconf(Env.DB_POOL_MAX, 20);
      const connectionTimeoutMillis = nconf(
        Env.DB_POOL_CONNECTION_TIMEOUT_MILLIS,
        60_000,
      );
      const idleTimeoutMillis = nconf(Env.DB_POOL_IDLE_TIMEOUT_MILLIS, 60_000);
      const maxUses = nconf(Env.DB_POOL_MAX_USES, 7_500);
      const statement_timeout = nconf(Env.DB_POOL_STATEMENT_TIMEOUT, 1_000);
      const query_timeout = nconf(Env.DB_POOL_QUERY_TIMEOUT, 1_000);
      const lock_timeout = nconf(Env.DB_POOL_LOCK_TIMEOUT, 1_000);

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

export function InjectPrismaClient(
  name = DEFAULT_PRISMA_CLIENT_NAME,
): ParameterDecorator {
  return (...args) => {
    Inject(prismaClientToken(name))(...args);
  };
}
