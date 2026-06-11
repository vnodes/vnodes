import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

export const GlobalValidationPipe = new ValidationPipe({
  transform: true,

  exceptionFactory(errors) {
    throw new UnprocessableEntityException({ errors });
  },
  transformOptions: {
    exposeDefaultValues: true,
    exposeUnsetFields: false,
  },
});
