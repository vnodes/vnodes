import { ConfigurableModuleBuilder, Module } from "@nestjs/common";
import type { PrismaClientOptions } from "@prisma/client/runtime/client";

export const { ConfigurableModuleClass: PrismaConfigurableModuleClass, MODULE_OPTIONS_TOKEN: PrismaClientToken } =
    new ConfigurableModuleBuilder<PrismaClientOptions>().build();

@Module({})
export class PrismaModule extends PrismaConfigurableModuleClass {}
