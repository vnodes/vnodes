import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

export const GlobalValidationPipe = new ValidationPipe({
    transform: true,
    errorHttpStatusCode: 422,
    forbidNonWhitelisted: true,
    transformOptions: {
        enableImplicitConversion: true,
    },
    exceptionFactory(errors) {
        throw new UnprocessableEntityException({ errors });
    },
});
