import { boot } from '@vnodes/boot-grpc';
import { AppModule } from './app.module';

export async function main() {
    await boot({ appModule: AppModule });
}
