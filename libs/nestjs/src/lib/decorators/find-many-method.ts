import { Get, Query, Type, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { FindManyMethodOptions } from './crud-controller-options.js';

export function propertyNames(cls: Type) {
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
        ApiQuery({ required: false, default: 20, name: 'take', type: Number })(...args);
        ApiQuery({ required: false, default: 0, name: 'skip', type: Number })(...args);
        ApiQuery({ required: false, name: 'search', type: String })(...args);
        ApiQuery({
            type: String,
            required: false,
            name: 'orderBy',
            enum: propertyNames(options.readDto),
        })(...args);
        ApiQuery({ required: false, name: 'orderDir', enum: ['asc', 'desc'] })(...args);
        ApiQuery({ required: false, name: 'withDeleted', type: Boolean })(...args);
        Query(
            new ValidationPipe({
                transform: true,
                errorHttpStatusCode: 422,
                forbidNonWhitelisted: true,
                expectedType: options.queryDto,
                transformOptions: {
                    exposeUnsetFields: false,
                    enableImplicitConversion: true,
                },
                exceptionFactory(errors) {
                    throw new UnprocessableEntityException({ errors });
                },
            }),
        )(target, methodName, 0);
        // Reflect.defineMetadata('design:paramtypes', [options.queryDto], target);

        // ApiQuery({ type: () => options.queryDto, required: false })(...args);
    };
}
