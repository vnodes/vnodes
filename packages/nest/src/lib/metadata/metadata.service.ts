import { Inject, Injectable, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Profile } from '@vnodes/env';
import type { Some } from '@vnodes/types';
import { MetadataToken } from '../constants/metadata-token.js';

/**
 * Metadata service that provides a easy access to the provided {@link MetadataToken} in the cotext.
 */
@Injectable()
export class MetadataService {
  constructor(@Inject(Reflector) protected readonly reflector: Reflector) {}

  protected getAllAndOverride<T>(token: MetadataToken, context: ExecutionContext) {
    return this.reflector.getAllAndOverride<T>(token, [context.getHandler(), context.getClass()]);
  }

  protected getFromHandler<T>(token: MetadataToken, context: ExecutionContext) {
    return this.reflector.get<T>(token, context.getHandler());
  }

  protected getFromClass<T>(token: MetadataToken, context: ExecutionContext) {
    return this.reflector.get<T>(token, context.getClass());
  }

  protected getAll<T>(token: MetadataToken, context: ExecutionContext) {
    return this.reflector.getAll<T[]>(token, [context.getHandler(), context.getClass()]);
  }

  /**
   * Get {@link MetadataToken.ADMIN_ONLY}
   */
  isAdminOnly(context: ExecutionContext): boolean {
    return this.getAllAndOverride<boolean>(MetadataToken.ADMIN_ONLY, context) === true;
  }

  /**
   * Get {@link MetadataToken.EMIT_RESPONSE}
   */
  isEmittedResponse(context: ExecutionContext): boolean {
    return this.getFromHandler<boolean>(MetadataToken.EMIT_RESPONSE, context) === true;
  }

  /**
   * Get {@link MetadataToken.EMIT_REQUEST}
   */
  isEmittedRequest(context: ExecutionContext): boolean {
    return this.getFromHandler<boolean>(MetadataToken.EMIT_REQUEST, context) === true;
  }
  /**
   * Get {@link MetadataToken.PUBLIC}
   */
  isPublic(context: ExecutionContext): boolean {
    return this.getAllAndOverride<boolean>(MetadataToken.PUBLIC, context) === true;
  }

  /**
   * Get {@link MetadataToken.STRICT_RATE_LIMIT}
   */
  isStrictRateLimit(context: ExecutionContext): boolean {
    return this.getAllAndOverride<boolean>(MetadataToken.STRICT_RATE_LIMIT, context) === true;
  }

  /**
   * Get {@link MetadataToken.SCOPE}
   */
  getScope(context: ExecutionContext): Some<string> {
    return this.getFromHandler<string>(MetadataToken.SCOPE, context);
  }

  /**
   * Get {@link MetadataToken.RESOURCE}
   */
  getResourceName(context: ExecutionContext): Some<string> {
    return this.getFromHandler<string>(MetadataToken.RESOURCE, context);
  }

  /**
   * Get {@link MetadataToken.OPERATION}
   */
  getOperationName(context: ExecutionContext): Some<string> {
    return this.getFromHandler<string>(MetadataToken.OPERATION, context);
  }

  /**
   * Create the default event name by joining `scope`, `resourceName`, and `operationName` if not provided explicitly with the {@link EventName} metadata decorator
   */
  defaultEventName(context: ExecutionContext) {
    return `${this.getScope(context)}.${this.getResourceName(context)}.${this.getOperationName(context)}`;
  }

  /**
   * Get {@link MetadataToken.OPERATION} if provided or get by {@link defaultEventName} method
   */
  getEventName(context: ExecutionContext): string {
    return this.getFromHandler<string>(MetadataToken.OPERATION, context) ?? this.defaultEventName(context);
  }

  /**
   * Get the list of permissions by {@link MetadataToken.PERMISSIONS} if provided
   */
  getPermissions(context: ExecutionContext): Some<string[]> {
    return this.getAll<string>(MetadataToken.PERMISSIONS, context);
  }

  /**
   * Get the list of roles by {@link MetadataToken.ROLES} if provided
   */
  getRoles(context: ExecutionContext): Some<string[]> {
    return this.getAll<string>(MetadataToken.ROLES, context);
  }

  /**
   * Get the profile by {@link MetadataToken.PROFILES}
   */
  getProfile(context: ExecutionContext): Profile {
    return this.getAllAndOverride<Profile>(MetadataToken.PROFILES, context);
  }
}
