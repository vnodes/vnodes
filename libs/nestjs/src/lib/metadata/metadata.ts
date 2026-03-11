import { createMetadata, createMetadataWithoutValue } from './create-metadata.js';

export enum Metadata {
    PUBLIC = 'PUBLIC',
    ROLES = 'ROLES',
    PERMISSIONS = 'PERMISSIONS',
    RESOURCE_NAME = 'RESOURCE_NAME',
    OPERATION_NAME = 'OPERATION_NAME',
    EMIT_RESPONSE = 'EMIT_RESPONSE',
}

export const {
    /**
     * Set resource name
     */
    set: ResourceName,
    /**
     * Get resource name
     */
    get: getResourceName,
} = createMetadata<string>(Metadata.ROLES);

export const {
    /**
     * Set operation name
     */
    set: OperationName,
    /**
     * Get operation name
     */
    get: getOperationName,
} = createMetadata<string>(Metadata.OPERATION_NAME);

export const {
    /**
     * Set permissions
     */
    set: Permissions,
    /**
     * Get permissions
     */
    get: getPermissions,
} = createMetadata<string[]>(Metadata.PERMISSIONS);

export const {
    /**
     * Set roles
     */
    set: Roles,
    /**
     * Get roles
     */
    get: getRoles,
} = createMetadata<string[]>(Metadata.ROLES);

export const {
    /**
     * Set resource as public
     */
    set: Public,
    /**
     * Check the resource is public or not
     */
    get: isPublic,
} = createMetadataWithoutValue(Metadata.PUBLIC);

export const {
    /**
     * Mark the resource to emit operation response payload
     */
    set: EmitResponse,

    /**
     * Check the resource is marked to emit response payload
     */
    get: isEmitResponse,
} = createMetadataWithoutValue(Metadata.EMIT_RESPONSE);
