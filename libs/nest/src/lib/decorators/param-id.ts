import { Param } from '@nestjs/common';
import { RestParam } from './rest-path.js';

export function ParamId(): ParameterDecorator {
    return (...args) => {
        Param(RestParam.ID)(...args);
    };
}
