/** biome-ignore-all lint/complexity/noStaticOnlyClass: Static functions */

import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  prismaClientToken,
  providePrismaClient,
} from './providers/provide-prisma-client.js';
import {
  prismaDelegateToken,
  providePrismaDelegate,
} from './providers/provide-prisma-delegate.js';
import { lowerCaseFirst } from '@vnodes/names';

export type PrismaModuleOptions = {
  client: Type;
  clientName?: string;
};

export type PrismaFeatureModuleOptions = {
  models: string[];
  clientName?: string;
};

@Module({
  imports: [ConfigModule],
})
export class PrismaModule {
  static forRoot(options: PrismaModuleOptions): DynamicModule {
    return {
      module: PrismaModule,
      global: true,
      providers: [providePrismaClient(options.client, options.clientName)],
      exports: [prismaClientToken(options.clientName)],
    };
  }
  static forFeature(options: PrismaFeatureModuleOptions): DynamicModule {
    const delegateProviders = options.models
      .map(lowerCaseFirst)
      .map((modelName) => providePrismaDelegate(modelName, options.clientName));
    const delegateTokens = options.models.map((modelName) =>
      prismaDelegateToken(modelName, options.clientName),
    );

    return {
      module: PrismaModule,
      providers: [...delegateProviders],
      exports: [...delegateTokens],
    };
  }
}
