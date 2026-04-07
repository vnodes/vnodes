
        import { Module } from '@vnodes/nestjs/common';
        import { PrismaModule } from '@vnodes/nestjs/prisma';
        import { PrismaClient } from '@vnodes/sample-db/client';
        import { CategoryModule } from './category/category.module.js';
import { SampleModule } from './sample/sample.module.js';

        @Module({
            imports: [PrismaModule.forRoot({ client: PrismaClient }), CategoryModule,SampleModule],
        })
        export class ResourceModule {}
        