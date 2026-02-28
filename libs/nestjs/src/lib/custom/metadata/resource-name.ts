import { type ExecutionContext, SetMetadata } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { Metadata } from 'src/lib/constants/metadata.js';

export const ResourceName = (name: string) => SetMetadata(Metadata.RESOURCE_NAME, name);

export function getResourceName(reflector: Reflector, context: ExecutionContext) {
    return reflector.getAllAndOverride<string>(Metadata.RESOURCE_NAME, [context.getHandler(), context.getClass()]);
}
