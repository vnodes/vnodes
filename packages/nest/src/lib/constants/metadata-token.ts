/**
 * Metdata tokens
 */
export enum MetadataToken {
  /**
   * Defines the operation as public that bypasses the authentication and autorization guard
   */
  PUBLIC = 'PUBLIC_METADATA_TOKEN',

  /**
   * Indicates that the response payload should be emitted
   */
  EMIT_RESPONSE = 'EMIT_RESPONSE_METADATA_TOKEN',

  /**
   * Indicates that the request payload should be emitted
   */
  EMIT_REQUEST = 'EMIT_REQUEST_METADATA_TOKEN',

  /**
   * Defines a scope for the target resource
   */
  SCOPE = 'SCOPE_METADATA_TOKEN',

  /**
   * Enforce administrative permissions to the operation/resource
   */
  ADMIN_ONLY = 'ADMIN_ONLY_METADATA_TOKEN',

  /**
   * Defines the resource name
   */
  RESOURCE = 'RESOURCE_METADATA_TOKEN',

  /**
   * Defines the operation name
   */
  OPERATION = 'OPERATION_METADATA_TOKEN',

  /**
   * Defines the event name for the target operation
   */
  EVENT_NAME = 'EVENT_NAME_METADATA_TOKEN',

  /**
   * Defines a list of required permissions for the target operation
   */
  PERMISSIONS = 'PERMISSIONS_METADATA_TOKEN',

  /**
   * Defines a list of required roles for the target operation/operations
   */
  ROLES = 'ROLES_METADATA_TOKEN',

  /**
   * Defines the profile for the target operation/resource
   */
  PROFILES = 'PROFILES_METADATA_TOKEN',

  /**
   * Enforce strict rate-limitting for the target operation/resource
   */
  STRICT_RATE_LIMIT = 'STRICT_RATE_LIMIT_METADATA_TOKEN',
}
