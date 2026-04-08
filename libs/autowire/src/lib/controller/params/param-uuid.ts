import { Param, ParseUUIDPipe } from '@vnodes/nestjs/common';

export function ParamUuid(): ParameterDecorator {
    return (...args) => {
        Param('id', ParseUUIDPipe)(...args);
    };
}
