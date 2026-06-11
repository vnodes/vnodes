import { Logger } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { EnvKeys, Env } from '@vnodes/types';

export function env(config: ConfigService): Env {
  const logger = new Logger('Env');

  const extractedEnv = EnvKeys.map((key) => {
    const value = config.get(key);
    if (!value) {
      logger.warn(`${key} -> Default -> ${Env[key]}`);
      return undefined;
    }
    logger.log(`${key} -> Env -> ${value}`);
    return { [key]: value };
  }).reduce((p, c) => {
    return { ...p, ...c };
  }, {});

  return new Env(extractedEnv);
}
