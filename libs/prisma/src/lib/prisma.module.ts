import { type DynamicModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule],
})
export class PrismaModule {
    readonly NAME = `PrismaModule`;

    static readonly DEFAULT_GROUP_NAME = "default";

    static clientToken(groupName = PrismaModule.DEFAULT_GROUP_NAME) {
        return `PRISMA_CLIENT_FOR_${groupName}`.toUpperCase();
    }

    static repoToken(resourceName: string, groupName = PrismaModule.DEFAULT_GROUP_NAME) {
        return `PRISMA_REPOSITORY_FOR_${resourceName}_${groupName}`.toUpperCase();
    }
    static forRoot(): DynamicModule {
        return { module: PrismaModule };
    }
}
