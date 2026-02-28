import { type ExecutionContext, SetMetadata } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { Metadata } from 'src/lib/constants/metadata.js';

export const OperationName = (name: string) => SetMetadata(Metadata.OPERATION_NAME, name);

export function getOperationName(reflector: Reflector, context: ExecutionContext) {
    return reflector.getAllAndOverride<string>(Metadata.OPERATION_NAME, [context.getHandler(), context.getClass()]);
}
