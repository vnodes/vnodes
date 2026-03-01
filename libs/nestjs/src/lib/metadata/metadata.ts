import { createMetadata, createMetadataWithoutValue } from './create-metadata.js';
export enum Metadata {
    PUBLIC = 'PUBLIC',
    ROLES = 'ROLES',
    PERMISSIONS = 'PERMISSIONS',
    RESOURCE_NAME = 'RESOURCE_NAME',
    OPERATION_NAME = 'OPERATION_NAME',
}

export const { set: ResourceName, get: getResourceName } = createMetadata<string>(Metadata.ROLES);

export const { set: OperationName, get: getOperationName } = createMetadata<string>(Metadata.OPERATION_NAME);

export const { set: Permissions, get: getPermissions } = createMetadata<string>(Metadata.PERMISSIONS);

export const { set: Roles, get: getRoles } = createMetadata<string>(Metadata.ROLES);

export const { set: Public, get: isPublic } = createMetadataWithoutValue(Metadata.ROLES);
