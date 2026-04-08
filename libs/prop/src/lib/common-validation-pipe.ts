import type { ClassTransformOptions } from '@vnodes/nestjs/class-transformer';
import type { ValidatorOptions } from '@vnodes/nestjs/class-validator';
import { UnprocessableEntityException, ValidationPipe, type ValidationPipeOptions } from '@vnodes/nestjs/common';
import { RpcException } from '@vnodes/nestjs/microservices';

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
