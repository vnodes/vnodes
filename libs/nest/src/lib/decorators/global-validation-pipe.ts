import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

export const GlobalValidationPipe = new ValidationPipe({
    transform: true,
    whitelist: true,
    transformOptions: {
        enableImplicitConversion: true,
        exposeUnsetFields: false,
    },
    errorHttpStatusCode: 422,
    exceptionFactory(errors) {
        const newErrors = errors
            .map((e) => {
                return { [e.property]: e.constraints };
            })
            .reduce((p, c) => {
                return Object.assign(p, c);
            }, {});

        throw new UnprocessableEntityException({ errors: newErrors });
    },
});
