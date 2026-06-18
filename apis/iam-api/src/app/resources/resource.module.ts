import { Module } from '@vnodes/nest';
import { SampleModule } from './sample/sample.module.js';
import { PrismaModule } from '@vnodes/prisma';
import { PrismaClient } from '@vnodes/iam-db/client';

@Module({
  imports: [PrismaModule.forRoot({ client: PrismaClient }), SampleModule],
})
export class ResourceModule {}
