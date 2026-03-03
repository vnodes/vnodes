import { Type } from '@nestjs/common';
import { Prop } from '../property/index.js';

export type CrudControllerOptions = {
    readDto?: Type;
    createDto?: Type;
    updateDto?: Type;
    queryDto?: Type;
};

export type CreateMethodOptions = Pick<CrudControllerOptions, 'createDto' | 'readDto'>;
export type UpdateMethodOptions = Required<Pick<CrudControllerOptions, 'updateDto' | 'readDto'>>;
export type DeleteMethodOptions = Required<Pick<CrudControllerOptions, 'readDto'>>;
export type FindManyMethodOptions = Required<Pick<CrudControllerOptions, 'queryDto' | 'readDto'>>;
export type FindOneByIdOptions = Required<Pick<CrudControllerOptions, 'readDto'>>;

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
