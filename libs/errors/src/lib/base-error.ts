import { ErrorCode } from './error-code.js';

function replaceParams(message: string, params?: Record<string, unknown>) {
    if (params) {
        const entries = Object.entries(params);
        for (const [key, value] of entries) {
            message = message.replaceAll(new RegExp(`\\$${key}`, 'g'), value ? value.toString() : 'null');
        }
    } else {
        message = message.replaceAll(/\$[\w]+/g, 'null');
    }

    return message;
}
export abstract class BaseError extends Error {
    public readonly timestamp: string;

    constructor(
        public override readonly message: string,
        public readonly statusCode = ErrorCode.InternalServerError,
        public readonly context?: Record<string, unknown>,
    ) {
        // Pass message to the native Error constructor
        super(replaceParams(message, context));

        // Set the name to the class name (e.g., "ValidationError")
        this.name = this.constructor.name;

        this.timestamp = new Date().toISOString();

        // Fix the prototype chain for 'instanceof' checks to work correctly
        // after transpilation to ES5/ES6
        Object.setPrototypeOf(this, new.target.prototype);

        // Captures the stack trace, excluding the constructor from the trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
