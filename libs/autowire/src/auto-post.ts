import { Body, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AutoControllerOptions } from './auto-controller-options.js';

export enum CreateMethodName {
    createOne = 'createOne',
}

export function __CreateOneMethod(): MethodDecorator {
    return (...args) => {
        Post()(...args);
    };
}

export function AutoPost(options: AutoControllerOptions): MethodDecorator {
    return (...args) => {
        const methodName = args[1].toString();
        switch (methodName.toString() as CreateMethodName) {
            case CreateMethodName.createOne: {
                __CreateOneMethod()(...args);
                ApiCreatedResponse({ type: options.readDto })(...args);
                Body()(args[0], args[1], 0);
                Reflect.defineMetadata('design:paramtypes', [options.createDto], args[0], args[1]);
                break;
            }
            default: {
                throw new Error(`${methodName.toString()} is not supported`);
            }
        }
    };
}
