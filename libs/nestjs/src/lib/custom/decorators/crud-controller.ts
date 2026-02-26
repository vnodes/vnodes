import { Controller, type Type } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { names } from '@vnodes/names';

export type CrudControllerOptions = {
    readDto: Type;
    createDto: Type;
    updateDto: Type;
    queryDto: Type;
};

export const EXTRACT_RESOURCE_NAME_EXP = /Controller/;

/**
 * Autowire nestjs resource controller with crud operations
 *
 * @returns
 */
export function CrudController(options: CrudControllerOptions): ClassDecorator {
    return (...args) => {
        const targetClass = args[0];
        const targetClassName = targetClass.name;
        const __resourceName = targetClassName.replace(EXTRACT_RESOURCE_NAME_EXP, '');
        const { kebabCase: resourcePath } = names(__resourceName);

        Controller(resourcePath)(...args);
        ApiBearerAuth()(...args);

        //
    };
}
