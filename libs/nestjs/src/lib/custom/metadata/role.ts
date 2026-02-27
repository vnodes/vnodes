import { type ExecutionContext, SetMetadata } from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { Metadata } from '../../constants/index.js';

/**
 * Set required roles
 *
 * @param roles list of role names
 * @returns decorator {@link MethodDecorator}/{@link ClassDecorator}
 */
export const Roles = (roles: Readonly<string[]>) =>
    SetMetadata<Metadata.ROLE, Readonly<string[]>>(Metadata.ROLE, roles);

/**
 * Get the list of required roles for the operation
 *
 * @param reflector Reflector
 * @param context ExecutionContext
 * @returns list of role names
 */
export function getRequiredRoles(reflector: Reflector, context: ExecutionContext): string[] {
    return reflector.get<string[], Metadata>(Metadata.ROLE, context.getClass());
}
