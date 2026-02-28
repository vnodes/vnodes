import { type ExecutionContext, SetMetadata } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { Metadata } from '../../constants/metadata.js';

export const Permissions = (...permissions: string[]) => SetMetadata(Metadata.PERMISSIONS, permissions.join(','));

export function getRequiredPermissions(reflector: Reflector, context: ExecutionContext): string {
    return reflector.get<string, Metadata>(Metadata.PERMISSIONS, context.getClass());
}
