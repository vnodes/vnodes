import { type FactoryProvider, Inject } from '@nestjs/common';
import {
  DEFAULT_PRISMA_CLIENT_NAME,
  prismaClientToken,
} from './provide-prisma-client.js';
import { lowerCaseFirst } from '@vnodes/names';

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

export function InjectDelegate(
  modelName: string,
  clientName: string = DEFAULT_PRISMA_CLIENT_NAME,
): ParameterDecorator {
  return (...args) => {
    modelName = lowerCaseFirst(modelName);
    Inject(prismaDelegateToken(modelName, clientName))(...args);
  };
}
