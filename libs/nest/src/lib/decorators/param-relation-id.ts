import { Param } from '@nestjs/common';
import { RestParam } from './rest-path.js';

export function ParamRelationId(): ParameterDecorator {
    return (...args) => {
        Param(RestParam.RELATION_ID)(...args);
    };
}
