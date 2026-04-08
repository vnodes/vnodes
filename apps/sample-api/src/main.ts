import '@vnodes/nestjs/core';
import { boot } from '@vnodes/boot-fastify';

import { AppModule } from './app.module.js';

export async function main() {
    await boot({ module: AppModule });
}
