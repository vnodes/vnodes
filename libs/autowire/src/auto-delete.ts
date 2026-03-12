import { Delete } from '@nestjs/common';

export enum DeleteMethodName {
    deleteOneById = 'deleteOneById',
    deleteOneByUuid = 'deleteOneByUuid',
}

export function __DeleteOneByIdMethod(): MethodDecorator {
    return (...args) => {
        Delete(':id')(...args);
    };
}

export function __DeleteOneByUuid(): MethodDecorator {
    return (...args) => {
        Delete(':uuid')(...args);
    };
}

export function AutoDelete(): MethodDecorator {
    return (...args) => {
        const methodName = args[1].toString();
        switch (methodName.toString() as DeleteMethodName) {
            case DeleteMethodName.deleteOneById: {
                __DeleteOneByIdMethod()(...args);
                break;
            }
            case DeleteMethodName.deleteOneByUuid: {
                __DeleteOneByUuid()(...args);
                break;
            }
            default: {
                throw new Error(`${methodName.toString()} is not supported`);
            }
        }
    };
}
