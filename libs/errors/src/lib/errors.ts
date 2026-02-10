import { BaseError } from './base-error.js';

export class InvalidNameError extends BaseError {
  constructor(message: string, context?: Record<string, string | number>) {
    super(message, 422, context);
  }
}

export class InvalidResourceNameError extends BaseError {
  constructor(message: string, context?: Record<string, string | number>) {
    super(message, 422, context);
  }
}

export class RequiredInputError extends BaseError {
  constructor(message: string, context?: Record<string, string | number>) {
    super(message, 422, context);
  }
}

export class NullValueError extends BaseError {
  constructor(message: string, context?: Record<string, string | number>) {
    super(message, 422, context);
  }
}

export class UndefinedValueError extends BaseError {
  constructor(message: string, context?: Record<string, string | number>) {
    super(message, 422, context);
  }
}

export class MinLengthError extends BaseError {
  constructor(message: string, context?: Record<string, string | number>) {
    super(message, 422, context);
  }
}

export class MaxLengthError extends BaseError {
  constructor(message: string, context?: Record<string, string | number>) {
    super(message, 422, context);
  }
}

export class AccessDeniedError extends BaseError {
  constructor(message: string, context?: Record<string, string | number>) {
    super(message, 401, context);
  }
}

export class FileOutOfScopeError extends BaseError {
  constructor(message: string, context?: Record<string, string | number>) {
    super(message, 401, context);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string, context?: Record<string, string | number>) {
    super(message, 403, context);
  }
}

export class NotInjectedError extends BaseError {
  constructor(message: string, context?: Record<string, string | number>) {
    super(message, 404, context);
  }
}