import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

/**
 * Global validation pipe
 */
export const GlobalValidationPipe = new ValidationPipe({
  transform: true,
  errorHttpStatusCode: 422,

  exceptionFactory(errors) {
    throw new UnprocessableEntityException({ errors });
  },
  transformOptions: {
    exposeDefaultValues: true,
    exposeUnsetFields: false,
  },
});
