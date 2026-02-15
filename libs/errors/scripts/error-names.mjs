import { errorCodes } from './error-codes.mjs';

export const errorNames = [
    ['InvalidName', errorCodes.UnprocessableEntity],
    ['InvalidResourceName', errorCodes.UnprocessableEntity],
    ['RequiredInput', errorCodes.UnprocessableEntity],
    ['NullValue', errorCodes.UnprocessableEntity],
    ['UndefinedValue', errorCodes.UnprocessableEntity],
    ['MinLength', errorCodes.UnprocessableEntity],
    ['MaxLength', errorCodes.UnprocessableEntity],
    ['AccessDenied', errorCodes.Unauthorized],
    ['FileOutOfScope', errorCodes.Unauthorized],
    ['Forbidden', errorCodes.Forbidden],
    ['NotInjected', errorCodes.NotFound],
];
