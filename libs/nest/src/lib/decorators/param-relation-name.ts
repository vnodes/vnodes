import { Param } from '@nestjs/common';
import { RestParam } from './rest-path.js';

export function ParamRelationName(): ParameterDecorator {
    return (...args) => {
        Param(RestParam.RELATION_NAME)(...args);
    };
}
