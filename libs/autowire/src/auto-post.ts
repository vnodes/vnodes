import { Post } from '@nestjs/common';

export enum CreateMethodName {
    createOne = 'createOne',
}

export function __CreateOneMethod(): MethodDecorator {
    return (...args) => {
        Post()(...args);
    };
}

export function AutoPost(): MethodDecorator {
    return (...args) => {
        const methodName = args[1].toString();
        switch (methodName.toString() as CreateMethodName) {
            case CreateMethodName.createOne: {
                __CreateOneMethod()(...args);
                break;
            }
            default: {
                throw new Error(`${methodName.toString()} is not supported`);
            }
        }
    };
}
