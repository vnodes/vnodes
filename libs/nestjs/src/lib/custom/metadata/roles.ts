import { type ExecutionContext, SetMetadata } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { Metadata } from '../../constants/index.js';

export const Roles = (...roles: string[]) => SetMetadata(Metadata.ROLES, roles.join(','));

export function getRequiredRoles(reflector: Reflector, context: ExecutionContext): string {
    return reflector.get<string>(Metadata.ROLES, context.getClass());
}
