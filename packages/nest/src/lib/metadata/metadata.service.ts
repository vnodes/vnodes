import { Inject, Injectable, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MetadataToken, Profile, type Some } from '@vnodes/types';

@Injectable()
export class MetadataService {
  constructor(@Inject(Reflector) protected readonly reflector: Reflector) {}

  protected getAllAndOverride<T>(
    token: MetadataToken,
    context: ExecutionContext,
  ) {
    return this.reflector.getAllAndOverride<T>(token, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  protected getFromHandler<T>(token: MetadataToken, context: ExecutionContext) {
    return this.reflector.get<T>(token, context.getHandler());
  }

  protected getFromClass<T>(token: MetadataToken, context: ExecutionContext) {
    return this.reflector.get<T>(token, context.getClass());
  }

  protected getAll<T>(token: MetadataToken, context: ExecutionContext) {
    return this.reflector.getAll<T[]>(token, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  isAdminOnly(context: ExecutionContext): boolean {
    return (
      this.getAllAndOverride<boolean>(
        MetadataToken.ADMIN_ONLY_METADATA_TOKEN,
        context,
      ) === true
    );
  }

  isEmittedResponse(context: ExecutionContext): boolean {
    return (
      this.getFromHandler<boolean>(
        MetadataToken.EMIT_RESPONSE_METADATA_TOKEN,
        context,
      ) === true
    );
  }
  isEmittedRequest(context: ExecutionContext): boolean {
    return (
      this.getFromHandler<boolean>(
        MetadataToken.EMIT_REQUEST_METADATA_TOKEN,
        context,
      ) === true
    );
  }

  isPublic(context: ExecutionContext): boolean {
    return (
      this.getAllAndOverride<boolean>(
        MetadataToken.PUBLIC_METADATA_TOKEN,
        context,
      ) === true
    );
  }

  isStrictRateLimit(context: ExecutionContext): boolean {
    return (
      this.getAllAndOverride<boolean>(
        MetadataToken.STRICT_RATE_LIMIT,
        context,
      ) === true
    );
  }

  getScope(context: ExecutionContext): Some<string> {
    return this.getFromHandler<string>(
      MetadataToken.SCOPE_METADATA_TOKEN,
      context,
    );
  }

  getResourceName(context: ExecutionContext): Some<string> {
    return this.getFromHandler<string>(
      MetadataToken.RESOURCE_NAME_METADATA_TOKEN,
      context,
    );
  }

  getOperationName(context: ExecutionContext): Some<string> {
    return this.getFromHandler<string>(
      MetadataToken.OPERATION_NAME_METADATA_TOKEN,
      context,
    );
  }

  defaultEventName(context: ExecutionContext) {
    return `${this.getScope(context)}.${this.getResourceName(context)}.${this.getOperationName(context)}`;
  }

  getEventName(context: ExecutionContext): string {
    return (
      this.getFromHandler<string>(
        MetadataToken.OPERATION_NAME_METADATA_TOKEN,
        context,
      ) ?? this.defaultEventName(context)
    );
  }

  getPermissions(context: ExecutionContext): Some<string[]> {
    return this.getAll<string>(
      MetadataToken.PERMISSIONS_METADATA_TOKEN,
      context,
    );
  }

  getRoles(context: ExecutionContext): Some<string[]> {
    return this.getAll<string>(MetadataToken.ROLES_METADATA_TOKEN, context);
  }

  getProfile(context: ExecutionContext): Profile {
    return this.getAllAndOverride<Profile>(
      MetadataToken.PROFILES_METADATA_TOKEN,
      context,
    );
  }
}
