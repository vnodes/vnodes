import { boot } from '@vnodes/core/fastify';
import { AppModule } from './app.module.js';

async function main() {
    await boot({ appModule: AppModule });
}

main();
