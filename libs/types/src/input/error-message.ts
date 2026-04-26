import type { Any } from '../common/any.js';

export type ConstraintValue = string | number | boolean;
export type Constraints = {
    required: boolean;
    minlength: number;
    maxlength: number;
    min: number;
    max: number;
    positive: boolean;
    percent: boolean;
    fraction: boolean;
    email: boolean;
    password: boolean;
    uuid: boolean;
    ean: boolean;
};
export type ErrorMessageResolver = (value: Any, constraint: string, constraintValues: Constraints) => string;
