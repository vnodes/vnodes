import { Get, Query, Type } from '@nestjs/common';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { FindManyMethodOptions } from './crud-controller-options.js';
import { getPropertyDescriptor } from './helpers.js';

function propertyNames(cls: Type) {
    return Object.keys(
        plainToInstance(cls, {}, { exposeUnsetFields: true, exposeDefaultValues: true, strategy: 'exposeAll' }),
    );
}

export function FindManyMethod(options: FindManyMethodOptions): MethodDecorator {
    return (...args) => {
        const target = args[0];
        const methodName = args[1].toString();

        Get()(...args);
        ApiOkResponse({ type: options.readDto, isArray: true })(...args);
        const descriptor = getPropertyDescriptor(target, methodName);
        if (!descriptor) throw new Error('descriptor not found!');

        ApiQuery({ required: false, default: 20, name: 'take', type: 'number' })(target, methodName, descriptor);
        ApiQuery({ required: false, default: 0, name: 'skip', type: 'number' })(target, methodName, descriptor);
        ApiQuery({ required: false, name: 'search', type: 'string' })(target, methodName, descriptor);
        ApiQuery({
            required: false,
            name: 'orderBy',
            enum: propertyNames(options.readDto()),
        })(target, methodName, descriptor);
        ApiQuery({ required: false, name: 'orderDir', enum: ['asc', 'desc'] })(target, methodName, descriptor);
        ApiQuery({ required: false, name: 'withDeleted', type: 'boolean' })(target, methodName, descriptor);

        Query()(target, methodName, 0);
    };
}
