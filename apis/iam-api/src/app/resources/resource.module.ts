import { PrismaClient } from '@vnodes/iam-db/client';
import { UserModule } from '@vnodes/iam-db/nest';
import { Module } from '@vnodes/nest';
import { PrismaModule } from '@vnodes/prisma';

@Module({
  imports: [PrismaModule.forRoot({ client: PrismaClient }), UserModule],
  providers: [],
})
export class ResourceModule {}
