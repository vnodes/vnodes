import { Logger } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { Keys } from '@vnodes/types';

export enum Profile {
  /**
   * Disable the authentication and autorization under development/test prfile
   */
  DEV_NO_AUTH = 'DEV_NO_AUTH',

  /**
   * Development/test profile
   */
  DEV = 'DEV',

  /**
   * Production profile
   */
  PROD = 'PROD',

  /**
   * Disable all write operations for regular users but the developer. This might be used for fixing initial database eed or bulk data entry on request
   */
  PROD_DEV_ONLY = 'PROD_DEV_ONLY',
}

export class Env {
  static readonly APP_ID = 'APP_ID';
  static readonly PROFILE = 'PROFILE';
  static readonly PORT = 'PORT';
  static readonly PREFIX = 'PREFIX';
  static readonly DESC = 'DESC';
  static readonly DB_NAME = 'DB_NAME';
  static readonly DB_HOST = 'DB_HOST';
  static readonly DB_PORT = 'DB_PORT';
  static readonly DB_URL = 'DB_URL';
  static readonly DB_SCHEMA = 'DB_SCHEMA';
  static readonly DB_USERNAME = 'DB_USERNAME';
  static readonly DB_PASSWORD = 'DB_PASSWORD';
  static readonly ROOT_USERNAME = 'ROOT_USERNAME';
  static readonly ROOT_PASSWORD = 'ROOT_PASSWORD';
  static readonly JWT_SECRET = 'JWT_SECRET';

  static readonly CACHE_TTL = 'CACHE_TTL';

  static readonly THROTTLER_TTL = 'THROTTLER_TTL';
  static readonly THROTTLER_LIMIT = 'THROTTLER_LIMIT';

  static readonly DEFAULT_APP_ID = 'sample-api';
  static readonly DEFAULT_PROFILE = Profile.DEV;
  static readonly DEFAULT_PORT = 3000;
  static readonly DEFAULT_PREFIX = 'api';
  static readonly DEFAULT_DESC = 'Sample api';
  static readonly DEFAULT_DB_NAME = 'test_db';
  static readonly DEFAULT_DB_SCHEMA = 'sample';
  static readonly DEFAULT_DB_USERNAME = 'test_user';
  static readonly DEFAULT_DB_PASSWORD = 'password';
  static readonly DEFAULT_DB_HOST = 'localhost';
  static readonly DEFAULT_DB_PORT = 5432;
  static get DEFAULT_DB_URL() {
    return `postgres://${Env.DEFAULT_DB_USERNAME}:${Env.DEFAULT_DB_PASSWORD}@${this.DEFAULT_DB_HOST}:${this.DEFAULT_DB_PORT}/${this.DEFAULT_DB_NAME}?schema=${this.DEFAULT_DB_SCHEMA}`;
  }

  static readonly DEFAULT_ROOT_USERNAME = 'root';
  static readonly DEFAULT_ROOT_PASSWORD = '!Password123.';

  static readonly DEFAULT_JWT_SECRET = 'dev_secret';
  static readonly DEFAULT_CACHE_TTL = 7_000;

  static readonly DEFAULT_THROTTLER_TTL = 60_000;
  static readonly DEFAULT_THROTTLER_LIMIT = 100;

  readonly APP_ID: string;
  readonly PROFILE: string;
  readonly PORT: number;
  readonly PREFIX: string;
  readonly DESC: string;
  readonly DB_PORT: number;
  readonly DB_HOST: string;
  readonly DB_NAME: string;
  readonly DB_SCHEMA: string;
  readonly DB_USERNAME: string;
  readonly DB_PASSWORD: string;
  readonly DB_URL: string;
  readonly ROOT_USERNAME: string;
  readonly ROOT_PASSWORD: string;

  readonly JWT_SECRET?: string;
  readonly CACHE_TTL?: number;

  readonly THROTTLER_TTL?: number;
  readonly THROTTLER_LIMIT?: number;

  constructor(env?: Partial<Env>) {
    //
    this.APP_ID = env?.APP_ID ?? Env.DEFAULT_APP_ID;
    this.DESC = env?.DESC ?? Env.DEFAULT_DESC;
    this.PROFILE = env?.PROFILE ?? Env.DEFAULT_PROFILE;
    this.PORT = env?.PORT ?? Env.DEFAULT_PORT;
    this.PREFIX = env?.PREFIX ?? Env.DEFAULT_PREFIX;

    //
    this.DB_PORT = env?.DB_PORT ?? Env.DEFAULT_DB_PORT;
    this.DB_HOST = env?.DB_HOST ?? Env.DEFAULT_DB_HOST;
    this.DB_NAME = env?.DB_NAME ?? Env.DEFAULT_DB_NAME;
    this.DB_SCHEMA = env?.DB_SCHEMA ?? Env.DEFAULT_DB_SCHEMA;
    this.DB_USERNAME = env?.DB_USERNAME ?? Env.DEFAULT_DB_USERNAME;
    this.DB_PASSWORD = env?.DB_PASSWORD ?? Env.DEFAULT_DB_PASSWORD;
    this.DB_URL = env?.DB_URL ?? Env.DEFAULT_DB_URL;
    //
    this.ROOT_USERNAME = env?.ROOT_USERNAME ?? Env.DEFAULT_ROOT_USERNAME;
    this.ROOT_PASSWORD = env?.ROOT_PASSWORD ?? Env.DEFAULT_ROOT_PASSWORD;
    //
    this.JWT_SECRET = env?.JWT_SECRET ?? Env.DEFAULT_JWT_SECRET;

    //
    this.CACHE_TTL = env?.CACHE_TTL ?? Env.DEFAULT_CACHE_TTL;
    this.THROTTLER_TTL = env?.THROTTLER_TTL ?? Env.DEFAULT_THROTTLER_TTL;
    this.THROTTLER_LIMIT = env?.THROTTLER_LIMIT ?? Env.DEFAULT_THROTTLER_LIMIT;
  }
}

export const EnvKeys: Keys<Env> = [
  'APP_ID',
  'PROFILE',
  'PORT',
  'PREFIX',
  'DESC',
  'DB_NAME',
  'DB_HOST',
  'DB_PORT',
  'DB_URL',
  'DB_SCHEMA',
  'DB_USERNAME',
  'DB_PASSWORD',
  'ROOT_USERNAME',
  'ROOT_PASSWORD',
  'JWT_SECRET',
  'CACHE_TTL',
  'THROTTLER_TTL',
  'THROTTLER_LIMIT',
];

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
