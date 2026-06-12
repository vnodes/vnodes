import { type FactoryProvider, type Type } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { EnvService } from '@vnodes/config';

export const DEFAULT_PRISMA_CLIENT_NAME = 'default';

export function prismaClientToken(name: string = DEFAULT_PRISMA_CLIENT_NAME) {
  return `${name}_PRISMA_CLIENT`.toUpperCase();
}

export function providePrismaClient<PrismaClient>(
  client: Type<PrismaClient>,
  name: string = DEFAULT_PRISMA_CLIENT_NAME,
): FactoryProvider {
  return {
    inject: [EnvService],
    provide: prismaClientToken(name),
    useFactory(env: EnvService) {
      const adapter = new PrismaPg(
        {
          connectionString: env.DB_URL,
          connectionTimeoutMillis: env.DB_POOL_CONNECTION_TIMEOUT_MILLIS,
          idleTimeoutMillis: env.DB_POOL_IDLE_TIMEOUT_MILLIS,
          lock_timeout: env.DB_POOL_LOCK_TIMEOUT,
          max: env.DB_POOL_MAX,
          maxUses: env.DB_POOL_MAX_USES,
          query_timeout: env.DB_POOL_QUERY_TIMEOUT,
          statement_timeout: env.DB_POOL_STATEMENT_TIMEOUT,
        },
        { schema: env.DB_SCHEMA },
      );
      return new client({ adapter });
    },
  };
}
