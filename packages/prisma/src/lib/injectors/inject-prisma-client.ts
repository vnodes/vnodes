import { Inject } from '@nestjs/common';
import {
    DEFAULT_PRISMA_CLIENT_NAME,
    prismaClientToken,
} from '../providers/provide-prisma-client.js';

export function InjectPrismaClient(
  name = DEFAULT_PRISMA_CLIENT_NAME,
): ParameterDecorator {
  return (...args) => {
    Inject(prismaClientToken(name))(...args);
  };
}
