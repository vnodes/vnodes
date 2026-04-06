import { printNestjsController, printNestjsModule, printNestjsService } from '@vnodes/sample-db/nestjs'
import { names } from '@vnodes/nestjs/names'
import { writeTextFile } from '@vnodes/nestjs/fs'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Prisma } from '@vnodes/sample-db/client';



const __dirname = dirname(fileURLToPath(import.meta.url));


const models = Object.keys(Prisma.ModelName);
const basepath = join(__dirname, '../src/resources')

async function build() {

    for (const model of models) {

        const modelNames = names(model)
        const resourceDir = join(basepath, modelNames.kebab)
        const fileName = modelNames.kebab

        {
            const content = printNestjsService(modelNames)
            await writeTextFile(join(resourceDir, `${fileName}.service.ts`), content)
        }
        {
            const content = printNestjsController(modelNames)
            await writeTextFile(join(resourceDir, `${fileName}.controller.ts`), content)
        }
        {
            const content = printNestjsModule(modelNames)
            await writeTextFile(join(resourceDir, `${fileName}.module.ts`), content)
        }



    }

    {


        const resourceModuleNames = models.map(m => `${names(m).pascal}Module`).join(',')
        const resourceModuleImpors = models.map(m => {
            const { kebab, pascal } = names(m)
            return `import { ${pascal}Module } from './${kebab}/${kebab}.module.js';`
        }).join('\n')

        const resourceModule = () => `
        import { Module } from '@vnodes/nestjs/common';
        import { PrismaModule } from '@vnodes/nestjs/prisma';
        import { PrismaClient } from '@vnodes/sample-db/client';
        ${resourceModuleImpors}

        @Module({
            imports: [PrismaModule.forRoot({ client: PrismaClient }), ${resourceModuleNames}],
        })
        export class ResourceModule {}
        `


        await writeTextFile(join(basepath, 'resource.module.ts'), resourceModule())
    }

}


build()