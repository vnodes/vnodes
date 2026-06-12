import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './env.service.js';

@Module({
  imports: [ConfigModule.forRoot({ cache: true, isGlobal: true })],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvyModule {}
