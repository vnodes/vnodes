import { UnprocessableEntityException, ValidationPipe, type ValidationPipeOptions } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import type { ClassTransformOptions } from 'class-transformer';
import type { ValidatorOptions } from 'class-validator';

export const __validatorOptions: ValidatorOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
};

export const __transformOptions: ClassTransformOptions = {
    enableImplicitConversion: true,
    exposeUnsetFields: false,
};

const commonValidationPipeOptions: ValidationPipeOptions = {
    ...__validatorOptions,
    transformOptions: { ...__transformOptions },
    exceptionFactory(errors) {
        throw new UnprocessableEntityException({ errors });
    },
};
export const CommonValidationPipe = new ValidationPipe(commonValidationPipeOptions);

export const CommonGRpcValidationPipe = new ValidationPipe({
    ...commonValidationPipeOptions,
    exceptionFactory(errors) {
        throw new RpcException({ errors });
    },
});
