import { Profile } from './profile.js';

export class Env {
  static readonly APP_ID = 'APP_ID';
  static readonly PROFILE = 'PROFILE';
  static readonly PORT = 'PORT';
  static readonly PREFIX = 'PREFIX';
  static readonly DESC = 'DESC';
  static readonly ALLOWED_ORIGINS = 'ALLOWED_ORIGINS';
  static readonly NODE_ENV = 'NODE_ENV';
  static readonly IS_PROD = 'IS_PROD';
  static readonly IS_DEV = 'IS_DEV';
  static readonly ROOT_USERNAME = 'ROOT_USERNAME';
  static readonly ROOT_PASSWORD = 'ROOT_PASSWORD';
  static readonly JWT_SECRET = 'JWT_SECRET';
  static readonly CACHE_TTL = 'CACHE_TTL';
  static readonly THROTTLER_TTL = 'THROTTLER_TTL';
  static readonly THROTTLER_LIMIT = 'THROTTLER_LIMIT';
  static readonly DB_NAME = 'DB_NAME';
  static readonly DB_HOST = 'DB_HOST';
  static readonly DB_PORT = 'DB_PORT';
  static readonly DB_MIGRATIONS_PATH = 'DB_MIGRATIONS_PATH';
  static readonly DB_PRISMA_SCHEMA_PATH = 'DB_PRISMA_SCHEMA_PATH';
  static readonly DB_URL = 'DB_URL';
  static readonly DB_SCHEMA = 'DB_SCHEMA';
  static readonly DB_USERNAME = 'DB_USERNAME';
  static readonly DB_PASSWORD = 'DB_PASSWORD';
  static readonly DB_POOL_MAX = 'DB_POOL_MAX';
  static readonly DB_POOL_CONNECTION_TIMEOUT_MILLIS = 'DB_POOL_CONNECTION_TIMEOUT_MILLIS';
  static readonly DB_POOL_IDLE_TIMEOUT_MILLIS = 'DB_POOL_IDLE_TIMEOUT_MILLIS';
  static readonly DB_POOL_MAX_USES = 'DB_POOL_MAX_USES';
  static readonly DB_POOL_STATEMENT_TIMEOUT = 'DB_POOL_STATEMENT_TIMEOUT';
  static readonly DB_POOL_QUERY_TIMEOUT = 'DB_POOL_QUERY_TIMEOUT';
  static readonly DB_POOL_LOCK_TIMEOUT = 'DB_POOL_LOCK_TIMEOUT';

  // Default Values
  static readonly DEFAULT_APP_ID = 'sample';
  static readonly DEFAULT_PROFILE = Profile.DEV;
  static readonly DEFAULT_PORT = 3000;
  static readonly DEFAULT_PREFIX = 'api';
  static readonly DEFAULT_DESC = 'sample service';
  static readonly DEFAULT_ALLOWED_ORIGINS = '*';
  static readonly DEFAULT_NODE_ENV = 'dev';
  static readonly DEFAULT_IS_PROD = false;
  static readonly DEFAULT_IS_DEV = true;
  static readonly DEFAULT_DB_NAME = 'vnodes';
  static readonly DEFAULT_DB_SCHEMA = 'sample';
  static readonly DEFAULT_DB_USERNAME = 'vnodes';
  static readonly DEFAULT_DB_PASSWORD = 'password';
  static readonly DEFAULT_DB_HOST = 'localhost';
  static readonly DEFAULT_DB_PORT = 5432;
  static readonly DEFAULT_DB_URL = 'postgres://vnodes:password@localhost:5432/vnodes?schema=sample';
  static readonly DEFAULT_DB_MIGRATIONS_PATH = 'prisma/migrations';
  static readonly DEFAULT_DB_PRISMA_SCHEMA_PATH = 'prisma/schema.prisma';
  static readonly DEFAULT_ROOT_USERNAME = 'root';
  static readonly DEFAULT_ROOT_PASSWORD = '!Password123.';
  static readonly DEFAULT_JWT_SECRET = 'dev_secret';
  static readonly DEFAULT_CACHE_TTL = 7_000;
  static readonly DEFAULT_THROTTLER_TTL = 60_000;
  static readonly DEFAULT_THROTTLER_LIMIT = 100;
  static readonly DEFAULT_DB_POOL_MAX = 20;
  static readonly DEFAULT_DB_POOL_CONNECTION_TIMEOUT_MILLIS = 60_000;
  static readonly DEFAULT_DB_POOL_IDLE_TIMEOUT_MILLIS = 60_000;
  static readonly DEFAULT_DB_POOL_MAX_USES = 7_500;
  static readonly DEFAULT_DB_POOL_STATEMENT_TIMEOUT = 1_000;
  static readonly DEFAULT_DB_POOL_QUERY_TIMEOUT = 1_000;
  static readonly DEFAULT_DB_POOL_LOCK_TIMEOUT = 1_000;

  constructor(protected readonly env = process.env) {}

  get ALLOWED_ORIGINS() {
    return this.env.ALLOWED_ORIGINS;
  }
  get NODE_ENV() {
    return this.env.NODE_ENV;
  }
  get IS_PROD() {
    return this.env.IS_PROD;
  }
  get IS_DEV() {
    return this.env.IS_DEV;
  }

  get APP_ID() {
    return this.env.APP_ID;
  }
  get PROFILE() {
    return this.env.PROFILE;
  }
  get PORT() {
    return this.env.PORT;
  }
  get PREFIX() {
    return this.env.PREFIX;
  }
  get DESC() {
    return this.env.DESC;
  }
  get ROOT_USERNAME() {
    return this.env.ROOT_USERNAME;
  }
  get ROOT_PASSWORD() {
    return this.env.ROOT_PASSWORD;
  }
  get JWT_SECRET() {
    return this.env.JWT_SECRET;
  }
  get CACHE_TTL() {
    return this.env.CACHE_TTL;
  }
  get THROTTLER_TTL() {
    return this.env.THROTTLER_TTL;
  }
  get THROTTLER_LIMIT() {
    return this.env.THROTTLER_LIMIT;
  }
  get DB_NAME() {
    return this.env.DB_NAME;
  }
  get DB_HOST() {
    return this.env.DB_HOST;
  }
  get DB_PORT() {
    return this.env.DB_PORT;
  }
  get DB_MIGRATIONS_PATH() {
    return this.env.DB_MIGRATIONS_PATH;
  }
  get DB_PRISMA_SCHEMA_PATH() {
    return this.env.DB_PRISMA_SCHEMA_PATH;
  }
  get DB_URL() {
    return this.env.DB_URL;
  }
  get DB_SCHEMA() {
    return this.env.DB_SCHEMA;
  }
  get DB_USERNAME() {
    return this.env.DB_USERNAME;
  }
  get DB_PASSWORD() {
    return this.env.DB_PASSWORD;
  }
  get DB_POOL_MAX() {
    return this.env.DB_POOL_MAX;
  }
  get DB_POOL_CONNECTION_TIMEOUT_MILLIS() {
    return this.env.DB_POOL_CONNECTION_TIMEOUT_MILLIS;
  }
  get DB_POOL_IDLE_TIMEOUT_MILLIS() {
    return this.env.DB_POOL_IDLE_TIMEOUT_MILLIS;
  }
  get DB_POOL_MAX_USES() {
    return this.env.DB_POOL_MAX_USES;
  }
  get DB_POOL_STATEMENT_TIMEOUT() {
    return this.env.DB_POOL_STATEMENT_TIMEOUT;
  }
  get DB_POOL_QUERY_TIMEOUT() {
    return this.env.DB_POOL_QUERY_TIMEOUT;
  }
  get DB_POOL_LOCK_TIMEOUT() {
    return this.env.DB_POOL_LOCK_TIMEOUT;
  }

  protected orThrow<T>(key: string, value: T | undefined): T {
    if (value !== undefined) {
      return value;
    }
    throw new Error(`${key} is not defined!`);
  }

  get ALLOWED_ORIGINS_OR_THROW() {
    return this.orThrow(Env.ALLOWED_ORIGINS, this.ALLOWED_ORIGINS);
  }
  get NODE_ENV_OR_THROW() {
    return this.orThrow(Env.NODE_ENV, this.NODE_ENV);
  }
  get IS_PROD_OR_THROW() {
    return this.orThrow(Env.IS_PROD, this.IS_PROD);
  }
  get IS_DEV_OR_THROW() {
    return this.orThrow(Env.IS_DEV, this.IS_DEV);
  }

  get APP_ID_OR_THROW() {
    return this.orThrow(Env.APP_ID, this.APP_ID);
  }
  get PROFILE_OR_THROW() {
    return this.orThrow(Env.PROFILE, this.PROFILE);
  }
  get PORT_OR_THROW() {
    return this.orThrow(Env.PORT, this.PORT);
  }
  get PREFIX_OR_THROW() {
    return this.orThrow(Env.PREFIX, this.PREFIX);
  }
  get DESC_OR_THROW() {
    return this.orThrow(Env.DESC, this.DESC);
  }
  get ROOT_USERNAME_OR_THROW() {
    return this.orThrow(Env.ROOT_USERNAME, this.ROOT_USERNAME);
  }
  get ROOT_PASSWORD_OR_THROW() {
    return this.orThrow(Env.ROOT_PASSWORD, this.ROOT_PASSWORD);
  }
  get JWT_SECRET_OR_THROW() {
    return this.orThrow(Env.JWT_SECRET, this.JWT_SECRET);
  }
  get CACHE_TTL_OR_THROW() {
    return this.orThrow(Env.CACHE_TTL, this.CACHE_TTL);
  }
  get THROTTLER_TTL_OR_THROW() {
    return this.orThrow(Env.THROTTLER_TTL, this.THROTTLER_TTL);
  }
  get THROTTLER_LIMIT_OR_THROW() {
    return this.orThrow(Env.THROTTLER_LIMIT, this.THROTTLER_LIMIT);
  }
  get DB_NAME_OR_THROW() {
    return this.orThrow(Env.DB_NAME, this.DB_NAME);
  }
  get DB_HOST_OR_THROW() {
    return this.orThrow(Env.DB_HOST, this.DB_HOST);
  }
  get DB_PORT_OR_THROW() {
    return this.orThrow(Env.DB_PORT, this.DB_PORT);
  }
  get DB_MIGRATIONS_PATH_OR_THROW() {
    return this.orThrow(Env.DB_MIGRATIONS_PATH, this.DB_MIGRATIONS_PATH);
  }
  get DB_PRISMA_SCHEMA_PATH_OR_THROW() {
    return this.orThrow(Env.DB_PRISMA_SCHEMA_PATH, this.DB_PRISMA_SCHEMA_PATH);
  }
  get DB_URL_OR_THROW() {
    return this.orThrow(Env.DB_URL, this.DB_URL);
  }
  get DB_SCHEMA_OR_THROW() {
    return this.orThrow(Env.DB_SCHEMA, this.DB_SCHEMA);
  }
  get DB_USERNAME_OR_THROW() {
    return this.orThrow(Env.DB_USERNAME, this.DB_USERNAME);
  }
  get DB_PASSWORD_OR_THROW() {
    return this.orThrow(Env.DB_PASSWORD, this.DB_PASSWORD);
  }
  get DB_POOL_MAX_OR_THROW() {
    return this.orThrow(Env.DB_POOL_MAX, this.DB_POOL_MAX);
  }
  get DB_POOL_CONNECTION_TIMEOUT_MILLIS_OR_THROW() {
    return this.orThrow(
      Env.DB_POOL_CONNECTION_TIMEOUT_MILLIS,
      this.DB_POOL_CONNECTION_TIMEOUT_MILLIS,
    );
  }
  get DB_POOL_IDLE_TIMEOUT_MILLIS_OR_THROW() {
    return this.orThrow(Env.DB_POOL_IDLE_TIMEOUT_MILLIS, this.DB_POOL_IDLE_TIMEOUT_MILLIS);
  }
  get DB_POOL_MAX_USES_OR_THROW() {
    return this.orThrow(Env.DB_POOL_MAX_USES, this.DB_POOL_MAX_USES);
  }
  get DB_POOL_STATEMENT_TIMEOUT_OR_THROW() {
    return this.orThrow(Env.DB_POOL_STATEMENT_TIMEOUT, this.DB_POOL_STATEMENT_TIMEOUT);
  }
  get DB_POOL_QUERY_TIMEOUT_OR_THROW() {
    return this.orThrow(Env.DB_POOL_QUERY_TIMEOUT, this.DB_POOL_QUERY_TIMEOUT);
  }
  get DB_POOL_LOCK_TIMEOUT_OR_THROW() {
    return this.orThrow(Env.DB_POOL_LOCK_TIMEOUT, this.DB_POOL_LOCK_TIMEOUT);
  }

  protected orDefault<T extends string | number>(
    _key: string,
    value: T | undefined,
    defaultValue: string | number,
  ): T {
    if (value === undefined) {
      return defaultValue as T;
    }
    return value;
  }

  get APP_ID_OR_DEFAULT() {
    return this.orDefault(Env.APP_ID, this.APP_ID, Env.DEFAULT_APP_ID);
  }
  get PROFILE_OR_DEFAULT() {
    return this.orDefault(Env.PROFILE, this.PROFILE, Env.DEFAULT_PROFILE);
  }
  get PORT_OR_DEFAULT() {
    return this.orDefault(Env.PORT, this.PORT, Env.DEFAULT_PORT);
  }
  get PREFIX_OR_DEFAULT() {
    return this.orDefault(Env.PREFIX, this.PREFIX, Env.DEFAULT_PREFIX);
  }
  get DESC_OR_DEFAULT() {
    return this.orDefault(Env.DESC, this.DESC, Env.DEFAULT_DESC);
  }
  get ROOT_USERNAME_OR_DEFAULT() {
    return this.orDefault(Env.ROOT_USERNAME, this.ROOT_USERNAME, Env.DEFAULT_ROOT_USERNAME);
  }
  get ROOT_PASSWORD_OR_DEFAULT() {
    return this.orDefault(Env.ROOT_PASSWORD, this.ROOT_PASSWORD, Env.DEFAULT_ROOT_PASSWORD);
  }
  get JWT_SECRET_OR_DEFAULT() {
    return this.orDefault(Env.JWT_SECRET, this.JWT_SECRET, Env.DEFAULT_JWT_SECRET);
  }
  get CACHE_TTL_OR_DEFAULT() {
    return this.orDefault(Env.CACHE_TTL, this.CACHE_TTL, Env.DEFAULT_CACHE_TTL);
  }
  get THROTTLER_TTL_OR_DEFAULT() {
    return this.orDefault(Env.THROTTLER_TTL, this.THROTTLER_TTL, Env.DEFAULT_THROTTLER_TTL);
  }
  get THROTTLER_LIMIT_OR_DEFAULT() {
    return this.orDefault(Env.THROTTLER_LIMIT, this.THROTTLER_LIMIT, Env.DEFAULT_THROTTLER_LIMIT);
  }
  get DB_NAME_OR_DEFAULT() {
    return this.orDefault(Env.DB_NAME, this.DB_NAME, Env.DEFAULT_DB_NAME);
  }
  get DB_HOST_OR_DEFAULT() {
    return this.orDefault(Env.DB_HOST, this.DB_HOST, Env.DEFAULT_DB_HOST);
  }
  get DB_PORT_OR_DEFAULT() {
    return this.orDefault(Env.DB_PORT, this.DB_PORT, Env.DEFAULT_DB_PORT);
  }
  get DB_MIGRATIONS_PATH_OR_DEFAULT() {
    return this.orDefault(
      Env.DB_MIGRATIONS_PATH,
      this.DB_MIGRATIONS_PATH,
      Env.DEFAULT_DB_MIGRATIONS_PATH,
    );
  }
  get DB_PRISMA_SCHEMA_PATH_OR_DEFAULT() {
    return this.orDefault(
      Env.DB_PRISMA_SCHEMA_PATH,
      this.DB_PRISMA_SCHEMA_PATH,
      Env.DEFAULT_DB_PRISMA_SCHEMA_PATH,
    );
  }
  get DB_URL_OR_DEFAULT() {
    return this.orDefault(Env.DB_URL, this.DB_URL, Env.DEFAULT_DB_URL);
  }
  get DB_SCHEMA_OR_DEFAULT() {
    return this.orDefault(Env.DB_SCHEMA, this.DB_SCHEMA, Env.DEFAULT_DB_SCHEMA);
  }
  get DB_USERNAME_OR_DEFAULT() {
    return this.orDefault(Env.DB_USERNAME, this.DB_USERNAME, Env.DEFAULT_DB_USERNAME);
  }
  get DB_PASSWORD_OR_DEFAULT() {
    return this.orDefault(Env.DB_PASSWORD, this.DB_PASSWORD, Env.DEFAULT_DB_PASSWORD);
  }
  get DB_POOL_MAX_OR_DEFAULT() {
    return this.orDefault(Env.DB_POOL_MAX, this.DB_POOL_MAX, Env.DEFAULT_DB_POOL_MAX);
  }
  get DB_POOL_CONNECTION_TIMEOUT_MILLIS_OR_DEFAULT() {
    return this.orDefault(
      Env.DB_POOL_CONNECTION_TIMEOUT_MILLIS,
      this.DB_POOL_CONNECTION_TIMEOUT_MILLIS,
      Env.DEFAULT_DB_POOL_CONNECTION_TIMEOUT_MILLIS,
    );
  }
  get DB_POOL_IDLE_TIMEOUT_MILLIS_OR_DEFAULT() {
    return this.orDefault(
      Env.DB_POOL_IDLE_TIMEOUT_MILLIS,
      this.DB_POOL_IDLE_TIMEOUT_MILLIS,
      Env.DEFAULT_DB_POOL_IDLE_TIMEOUT_MILLIS,
    );
  }
  get DB_POOL_MAX_USES_OR_DEFAULT() {
    return this.orDefault(
      Env.DB_POOL_MAX_USES,
      this.DB_POOL_MAX_USES,
      Env.DEFAULT_DB_POOL_MAX_USES,
    );
  }
  get DB_POOL_STATEMENT_TIMEOUT_OR_DEFAULT() {
    return this.orDefault(
      Env.DB_POOL_STATEMENT_TIMEOUT,
      this.DB_POOL_STATEMENT_TIMEOUT,
      Env.DEFAULT_DB_POOL_STATEMENT_TIMEOUT,
    );
  }
  get DB_POOL_QUERY_TIMEOUT_OR_DEFAULT() {
    return this.orDefault(
      Env.DB_POOL_QUERY_TIMEOUT,
      this.DB_POOL_QUERY_TIMEOUT,
      Env.DEFAULT_DB_POOL_QUERY_TIMEOUT,
    );
  }
  get DB_POOL_LOCK_TIMEOUT_OR_DEFAULT() {
    return this.orDefault(
      Env.DB_POOL_LOCK_TIMEOUT,
      this.DB_POOL_LOCK_TIMEOUT,
      Env.DEFAULT_DB_POOL_LOCK_TIMEOUT,
    );
  }
}

export const env = new Env();
