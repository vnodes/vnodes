import { Body, Put } from '@nestjs/common';
import { AutoControllerOptions } from './auto-controller-options.js';

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

export function AutoPut(options: AutoControllerOptions): MethodDecorator {
    return (...args) => {
        const methodName = args[1].toString();
        switch (methodName.toString() as UpdateMethodName) {
            case UpdateMethodName.updateOneById: {
                __UpdateOneByIdMethod()(...args);
                Body()(args[0], args[1], 1);
                Reflect.defineMetadata('design:paramtypes', [Number, options.updateDto], args[0], args[1]);
                break;
            }
            case UpdateMethodName.updateOneByUuid: {
                __UpdateOneByUuid()(...args);
                Body()(args[0], args[1], 1);
                Reflect.defineMetadata('design:paramtypes', [String, options.updateDto], args[0], args[1]);

                break;
            }
            default: {
                throw new Error(`${methodName.toString()} is not supported`);
            }
        }
    };
}
