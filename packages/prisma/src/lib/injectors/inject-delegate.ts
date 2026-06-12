import { Inject } from '@nestjs/common';
import { DEFAULT_PRISMA_CLIENT_NAME } from '../providers/provide-prisma-client.js';
import { prismaDelegateToken } from '../providers/provide-prisma-delegate.js';

export function InjectDelegate(
  modelName: string,
  clientName: string = DEFAULT_PRISMA_CLIENT_NAME,
): ParameterDecorator {
  return (...args) => {
    Inject(prismaDelegateToken(modelName, clientName))(...args);
  };
}
