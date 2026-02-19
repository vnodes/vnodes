import { Module } from '@nestjs/common';
import { PrismaModule } from '@vnodes/prisma';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { UserQueryService } from './user-query.service.js';

@Module({
    imports: [PrismaModule.forFeature(['user'])],
    controllers: [UserController],
    providers: [UserService, UserQueryService],
})
export class UserModule {}