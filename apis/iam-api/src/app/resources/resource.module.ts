import { PrismaClient } from '@vnodes/iam-db/client';
import { Module } from '@vnodes/nest';
import { PrismaModule } from '@vnodes/prisma';

@Module({
  imports: [PrismaModule.forRoot({ client: PrismaClient })],

  providers: [],
})
export class ResourceModule {}
