import { Put } from '@nestjs/common';

export enum UpdateMethodName {
    updateOneById = 'updateOneById',
    updateOneByUuid = 'updateOneByUuid',
}

export function __UpdateOneByIdMethod(): MethodDecorator {
    return (...args) => {
        Put(':id')(...args);
    };
}

export function __UpdateOneByUuid(): MethodDecorator {
    return (...args) => {
        Put(':uuid')(...args);
    };
}

export function AutoPut(): MethodDecorator {
    return (...args) => {
        const methodName = args[1].toString();
        switch (methodName.toString() as UpdateMethodName) {
            case UpdateMethodName.updateOneById: {
                __UpdateOneByIdMethod()(...args);
                break;
            }
            case UpdateMethodName.updateOneByUuid: {
                __UpdateOneByUuid()(...args);
                break;
            }
            default: {
                throw new Error(`${methodName.toString()} is not supported`);
            }
        }
    };
}
