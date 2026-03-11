import {} from '@vnodes/core/platform-express';
import { boot } from '@vnodes/nestjs/boot-fastify';
import { AppModule } from './app.module.js';

boot({ appModule: AppModule });
