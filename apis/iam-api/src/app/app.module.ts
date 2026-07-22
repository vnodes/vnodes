import { ResourceModule } from '@vnodes/iam-db/resource-module';
import { CommonModule, Module } from '@vnodes/nest';

@Module({ imports: [CommonModule, ResourceModule], controllers: [] })
export class AppModule {}
