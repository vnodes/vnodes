import { Get } from '@nestjs/common';

export enum FindMethodName {
    find = 'find',
    findOneById = 'findOneById',
    findOneByUuid = 'findOneByUuid',
}

export function __FindMethod(): MethodDecorator {
    return (...args) => {
        Get()(...args);
    };
}
export function __FindOneByIdMethod(): MethodDecorator {
    return (...args) => {
        Get(':id')(...args);
    };
}

export function __FindOneByUuid(): MethodDecorator {
    return (...args) => {
        Get(':uuid')(...args);
    };
}

export function AutoGet(): MethodDecorator {
    return (...args) => {
        const methodName = args[1].toString();
        switch (methodName.toString() as FindMethodName) {
            case FindMethodName.find: {
                __FindMethod()(...args);
                break;
            }
            case FindMethodName.findOneById: {
                __FindOneByIdMethod()(...args);
                break;
            }
            case FindMethodName.findOneByUuid: {
                __FindOneByUuid()(...args);
                break;
            }
            default: {
                throw new Error(`${methodName.toString()} is not supported`);
            }
        }
    };
}
