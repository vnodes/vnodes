import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export function createMetadata<T>(name: string) {
    const token = () => `${name}_METADATA_TOKEN`.toUpperCase();
    const set = (value: T) => SetMetadata(token(), value);
    const get = (reflector: Reflector, context: ExecutionContext) =>
        reflector.getAllAndOverride<T>(token(), [context.getClass(), context.getHandler()]);
    return {
        get,
        set,
        token,
    };
}

export function createBooleanMetadata(name: string) {
    const token = () => `${name}_METADATA_TOKEN`.toUpperCase();
    const set = () => SetMetadata(token(), true);
    const get = (reflector: Reflector, context: ExecutionContext) =>
        reflector.getAllAndOverride(token(), [context.getClass(), context.getHandler()]);
    return {
        get,
        set,
        token,
    };
}

export const { get: isPublic, set: Public, token: publicMetadataToken } = createBooleanMetadata('PUBLIC');
export const {
    get: isEmitResponse,
    set: EmitResponse,
    token: emitMetadataToken,
} = createBooleanMetadata('EMIT_RESPONSE');

export const {
    get: getResourceName,
    set: ResourceName,
    token: resourceNameMetadataToken,
} = createMetadata<string>('RESOURCE_NAME');

export const {
    get: getOperationName,
    set: OperationName,
    token: operationNameMetadataToken,
} = createMetadata<string>('OPERATION_NAME');

export const {
    get: getPermissions,
    set: Permissions,
    token: permissionsMetadataToken,
} = createMetadata<string[]>('PERMISSIONS');

export const { get: getRoles, set: Roles, token: rolesMetadataToken } = createMetadata<string[]>('ROLES');

export const { get: getProfile, set: Profile, token: profileMetadataToken } = createMetadata<string>('PROFILE');
