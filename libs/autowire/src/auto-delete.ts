import { Delete, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AutoControllerOptions } from './auto-controller-options.js';

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

export function AutoDelete(options: AutoControllerOptions): MethodDecorator {
    return (...args) => {
        const methodName = args[1].toString();
        switch (methodName.toString() as DeleteMethodName) {
            case DeleteMethodName.deleteOneById: {
                __DeleteOneByIdMethod()(...args);
                ApiOkResponse({ type: options.readDto })(...args);
                Param('id')(args[0], args[1], 0);
                Reflect.defineMetadata('design:paramtypes', [Number], args[0], args[1]);

                break;
            }
            case DeleteMethodName.deleteOneByUuid: {
                __DeleteOneByUuid()(...args);
                ApiOkResponse({ type: options.readDto })(...args);
                Param('uuid')(args[0], args[1], 0);
                Reflect.defineMetadata('design:paramtypes', [String], args[0], args[1]);
                break;
            }
            default: {
                throw new Error(`${methodName.toString()} is not supported`);
            }
        }
    };
}
