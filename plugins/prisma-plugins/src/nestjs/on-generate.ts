import { join } from 'node:path';
import type { GeneratorOptions } from '@prisma/generator-helper';
import { writeTextFile } from '@vnodes/fs';
import { names } from '@vnodes/names';
import { printControllerClass } from './class-printers/print-controller-class.js';
import { printCreateDtoClass } from './class-printers/print-create-dto-class.js';
import { printModuleClass } from './class-printers/print-module-class.js';
import { printQueryDtoClass } from './class-printers/print-query-dto-class.js';
import { printQueryServiceClass } from './class-printers/print-query-service-class.js';
import { printReadDtoClass } from './class-printers/print-read-dto-class.js';
import { printResourceModuleClass } from './class-printers/print-resource-module-class.js';
import { printServiceClass } from './class-printers/print-service-class.js';
import { printUpdateDtoClass } from './class-printers/print-update-dto-class.js';

export default async function onGenerate(options: GeneratorOptions) {
    const output = options.generator.config.output ?? 'src/app/resources';
    const decoratorName = 'Prop';
    const packageName = '@vnodes/property';
    const clientBasePath = '../../../prisma';

    const datamodel = options.dmmf.datamodel;
    const models = datamodel.models;

    // const enumModels = options.dmmf.datamodel.enums;

    for (const model of models) {
        const modelNames = names(model.name);
        const fileName = modelNames.kebabCase;

        const imports = [`import { ${decoratorName} } from '${packageName}';`];

        if (model.fields.some((e) => e.kind === 'enum')) {
            imports.push(`import * as P from '${clientBasePath}/client.js';`);
        }

        const toDtoFileName = (dtoName: string) => `${fileName}-${dtoName}.dto.ts`;

        const baseResourcePath = join(output, fileName);
        const baseDtoFilePath = join(baseResourcePath, 'dtos');

        const readDtoFileName = toDtoFileName('read');
        const createDtoFileName = toDtoFileName('create');
        const updateDtoFileName = toDtoFileName('update');
        const queryDtoFileName = toDtoFileName('query');

        // Raed dto
        {
            const filePath = join(baseDtoFilePath, readDtoFileName);
            const content = [...imports, printReadDtoClass(model, 'Prop')].join('\n\n');
            await writeTextFile(filePath, content);
        }

        // Create dto
        {
            const filePath = join(baseDtoFilePath, createDtoFileName);
            const content = [...imports, printCreateDtoClass(model, 'Prop')].join('\n\n');
            await writeTextFile(filePath, content);
        }

        // Update dto
        {
            const filePath = join(baseDtoFilePath, updateDtoFileName);
            const content = [printUpdateDtoClass(model)].join('\n\n');
            await writeTextFile(filePath, content);
        }

        // Query dto
        {
            const filePath = join(baseDtoFilePath, queryDtoFileName);
            const content = [printQueryDtoClass(model)].join('\n\n');
            await writeTextFile(filePath, content);
        }

        // Query service class
        {
            const filePath = join(baseResourcePath, `${fileName}-query.service.ts`);
            const content = printQueryServiceClass(model);
            await writeTextFile(filePath, content);
        }
        // Service class
        {
            const filePath = join(baseResourcePath, `${fileName}.service.ts`);
            const content = printServiceClass(model);
            await writeTextFile(filePath, content);
        }

        // Controller class
        if (model.documentation) {
            const filePath = join(baseResourcePath, `${fileName}.controller.ts`);
            const content = printControllerClass(model);
            await writeTextFile(filePath, content);
        }

        // Module class
        {
            const filePath = join(baseResourcePath, `${fileName}.module.ts`);
            const content = printModuleClass(model);
            await writeTextFile(filePath, content);
        }

        // Dto baral file
        {
            const content = [
                `export * from './${readDtoFileName.replace('ts', 'js')}';`,
                `export * from './${createDtoFileName.replace('ts', 'js')}';`,
                `export * from './${updateDtoFileName.replace('ts', 'js')}';`,
                `export * from './${queryDtoFileName.replace('ts', 'js')}';`,
            ].join('\n');

            await writeTextFile(join(baseDtoFilePath, 'index.ts'), content);
        }

        // print module barel files
        {
            const content = [
                `export * from './dtos/index.js';`,
                `export * from './${modelNames.kebabCase}.controller.js';`,
                `export * from './${modelNames.kebabCase}.module.js';`,
                `export * from './${modelNames.kebabCase}.service.js';`,
                `export * from './${modelNames.kebabCase}-query.service.js';`,
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
