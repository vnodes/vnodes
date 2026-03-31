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
export class UndefinedError extends Error {
    constructor(message = '') {
        super(message);
        Object.setPrototypeOf(this, UndefinedError.prototype);
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export class NullError extends Error {
    constructor(message = '') {
        super(message);
        Object.setPrototypeOf(this, NullError.prototype);
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
export class NotNumberError extends Error {
    constructor(message = '') {
        super(message);
        Object.setPrototypeOf(this, NotNumberError.prototype);
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export class NotStringError extends Error {
    constructor(message = '') {
        super(message);
        Object.setPrototypeOf(this, NotStringError.prototype);
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export class NotBooleanError extends Error {
    constructor(message = '') {
        super(message);
        Object.setPrototypeOf(this, NotBooleanError.prototype);
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export class NotObjectError extends Error {
    constructor(message = '') {
        super(message);
        Object.setPrototypeOf(this, NotObjectError.prototype);
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export class EmptyStringError extends Error {
    constructor(message = '') {
        super(message);
        Object.setPrototypeOf(this, EmptyStringError.prototype);
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export class InvalidDateError extends Error {
    constructor(message = '') {
        super(message);
        Object.setPrototypeOf(this, InvalidDateError.prototype);
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
