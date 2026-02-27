import type { Type } from '@nestjs/common';
import { Prop } from './prop.js';

export type CrudControllerOptions = {
    readDto?: Type;
    createDto?: Type;
    updateDto?: Type;
    queryDto?: Type;
};

class DtoClass {
    @Prop() key: string;
    @Prop() value: string;
}
export function resolveCrudControllerOptions(options?: CrudControllerOptions): Required<CrudControllerOptions> {
    if (!options) {
        options = {};
    }

    if (!options.readDto) options.readDto = DtoClass;
    if (!options.createDto) options.createDto = DtoClass;
    if (!options.updateDto) options.updateDto = DtoClass;
    if (!options.queryDto) options.queryDto = DtoClass;

    return options as Required<CrudControllerOptions>;
}
