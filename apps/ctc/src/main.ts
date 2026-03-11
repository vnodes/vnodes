import { boot } from '@vnodes/nestjs/boot-fastify';
import { AppModule } from './app.module.js';

async function main() {
    await boot({ appModule: AppModule });
}

main();
