import type { ApiPropertyOptions } from '@nestjs/swagger';
import { Prop } from './prop.js';

export function PropOptional(options: ApiPropertyOptions = {}): PropertyDecorator {
    return (...args) => {
        options.required = false;
        Prop(options)(...args);
    };
}
