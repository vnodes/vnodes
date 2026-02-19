/** biome-ignore-all lint/performance/noAccumulatingSpread: Nest */
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
            .reduce((p, c) => ({ ...p, ...c }), {});

        throw new UnprocessableEntityException({ errors: newErrors });
    },
});
