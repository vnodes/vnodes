import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { AccessTokenController } from './access-token.controller.js';
import { AccessTokenService } from './access-token.service.js';
import { AccessTokenQueryService } from './access-token-query.service.js';

@Module({
    imports: [PrismaModule.forFeature(['accessToken'])],
    controllers: [AccessTokenController],
    providers: [AccessTokenService, AccessTokenQueryService],
    exports: [AccessTokenService],
})
export class AccessTokenModule {}
