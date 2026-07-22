import { type FactoryProvider } from '@nestjs/common';
import {
  DEFAULT_PRISMA_CLIENT_NAME,
  prismaClientToken,
} from './provide-prisma-client.js';

export function prismaDelegateToken(
  modelName: string,
  clientName: string = DEFAULT_PRISMA_CLIENT_NAME,
) {
  return `${modelName}_PRISMA_DELEGATE_${clientName}`.toUpperCase();
}

export function providePrismaDelegate<
  ModelName extends string,
  PrismaClient extends Record<ModelName, unknown>,
>(
  modelName: ModelName,
  clientName: string = DEFAULT_PRISMA_CLIENT_NAME,
): FactoryProvider {
  return {
    inject: [prismaClientToken(clientName)],
    provide: prismaDelegateToken(modelName, clientName),
    useFactory(client: PrismaClient) {
      return client[modelName];
    },
  };
}
