import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { Prisma } from '../../prisma/browser.js';

@Module({
  imports: [
    PrismaModule.forFeature({
      models: [Prisma.ModelName.Sample],
    }),
  ],
  providers: [],
  exports: [],
})
export class SampleDataModule {}
