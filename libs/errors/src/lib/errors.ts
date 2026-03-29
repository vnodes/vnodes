export class AccessDeniedError extends Error {
    constructor(message = '') {
        super(message);
        Object.setPrototypeOf(this, AccessDeniedError.prototype);
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export class RequiredError extends Error {
    constructor(message = '') {
        super(message);
        Object.setPrototypeOf(this, RequiredError.prototype);
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export class NotImplementedError extends Error {
    constructor(message = '') {
        super(message);
        Object.setPrototypeOf(this, NotImplementedError.prototype);
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}