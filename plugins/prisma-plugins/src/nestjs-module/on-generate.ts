import { join } from 'node:path';
import type { GeneratorOptions } from '@prisma/generator-helper';
import { writeTextFile } from '@vnodes/fs';
import { names } from '@vnodes/names';
import { printControllerClass } from './class-printers/print-controller-class.js';
import { printDtoClasses } from './class-printers/print-dto-classes.js';
import { printModuleClass } from './class-printers/print-module-class.js';
import { printResourceModuleClass } from './class-printers/print-resource-module-class.js';
import { printServiceClass } from './class-printers/print-service-class.js';

export default async function onGenerate(options: GeneratorOptions) {
    const output = options.generator.config.output ?? 'src/resources';
    const decoratorName = 'Prop';
    const packageName = '@vnodes/property';
    const clientBasePath = '../../../prisma';

    const datamodel = options.dmmf.datamodel;
    const models = datamodel.models;

    // const enumModels = options.dmmf.datamodel.enums;

    for (const model of models) {
        const { kebabCase } = names(model.name);

        const imports = [`import { ${decoratorName} } from '${packageName}';`];

        if (model.fields.some((e) => e.kind === 'enum')) {
            imports.push(`import * as P from '${clientBasePath}/client.js';`);
        }

        const dtoFilename = `${kebabCase}.dto.ts`;
        const controllerFilename = `${kebabCase}.controller.ts`;
        const serviceFilename = `${kebabCase}.service.ts`;
        const moduleFilename = `${kebabCase}.module.ts`;

        const baseResourcePath = join(output, kebabCase);

        {
            const filePath = join(baseResourcePath, dtoFilename);
            await writeTextFile(filePath, printDtoClasses(model));
        }

        // Service class
        {
            const filePath = join(baseResourcePath, serviceFilename);
            const content = printServiceClass(model);
            await writeTextFile(filePath, content);
        }

        // Controller class
        {
            const filePath = join(baseResourcePath, controllerFilename);
            const content = printControllerClass(model);
            await writeTextFile(filePath, content);
        }

        // Module class
        {
            const filePath = join(baseResourcePath, moduleFilename);
            const content = printModuleClass(model);
            await writeTextFile(filePath, content);
        }

        {
            const bexp = (name: string) => `export * from './${name.replace('.ts', '.js')}';`;
            const content = [
                bexp(controllerFilename),
                bexp(dtoFilename),
                bexp(moduleFilename),
                bexp(serviceFilename),
            ].join('\n');

            await writeTextFile(join(baseResourcePath, 'index.ts'), content);
        }
    }

    // Print resource module
    {
        const filePath = join(output, 'resource.module.ts');
        const content = printResourceModuleClass(datamodel);

        await writeTextFile(filePath, content);
    }

    // Print resouce barrel file
    {
        const content = [
            `export * from './resource.module.js';`,
            datamodel.models.map((e) => `export * from './${names(e.name).kebabCase}/index.js'`).join('\n'),
        ].join('\n');

        writeTextFile(join(output, 'index.ts'), content);
    }
}
