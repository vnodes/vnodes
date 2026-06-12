import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvDefault } from './env-default.js';
import { EnvKey } from './env-key.js';

@Injectable()
export class EnvService {
  protected readonly logger = new Logger(EnvService.name);
  constructor(
    @Inject(ConfigService) protected readonly config: ConfigService,
  ) {}

  protected get<T>(key: EnvKey, defaultValue?: T) {
    const found = this.config.get(key);
    if (found !== undefined) {
      return found;
    }

    this.logger.log(
      `${key} is not found in the environment. The default value, ${defaultValue}, is used.`,
    );
    return defaultValue;
  }

  protected getOrThrow<T>(key: EnvKey, defaultValue?: T) {
    const found = this.get<T>(key, defaultValue);

    if (found !== undefined) {
      return found;
    }

    throw new Error(`${key} is not provided in the environment`);
  }

  get APP_ID() {
    return this.get(EnvKey.APP_ID, EnvDefault.APP_ID);
  }
  get PROFILE() {
    return this.get(EnvKey.PROFILE, EnvDefault.PROFILE);
  }
  get PORT() {
    return Number(this.get(EnvKey.PORT, EnvDefault.PORT));
  }
  get PREFIX() {
    return this.get(EnvKey.PREFIX, EnvDefault.PREFIX);
  }
  get DESC() {
    return this.get(EnvKey.DESC, EnvDefault.DESC);
  }
  get DB_NAME() {
    return this.get(EnvKey.DB_NAME, EnvDefault.DB_NAME);
  }
  get DB_SCHEMA() {
    return this.get(EnvKey.DB_SCHEMA, EnvDefault.DB_SCHEMA);
  }
  get DB_USERNAME() {
    return this.get(EnvKey.DB_USERNAME, EnvDefault.DB_USERNAME);
  }
  get DB_PASSWORD() {
    return this.get(EnvKey.DB_PASSWORD, EnvDefault.DB_PASSWORD);
  }
  get DB_HOST() {
    return this.get(EnvKey.DB_HOST, EnvDefault.DB_HOST);
  }
  get DB_PORT() {
    return Number(this.get(EnvKey.DB_PORT, EnvDefault.DB_PORT));
  }
  get DB_URL() {
    return this.get(EnvKey.DB_URL, EnvDefault.DB_URL);
  }

  get ROOT_USERNAME() {
    return this.get(EnvKey.ROOT_USERNAME, EnvDefault.ROOT_USERNAME);
  }
  get ROOT_PASSWORD() {
    return this.get(EnvKey.ROOT_PASSWORD, EnvDefault.ROOT_PASSWORD);
  }

  get JWT_SECRET() {
    return this.get(EnvKey.JWT_SECRET, EnvDefault.JWT_SECRET);
  }
  get CACHE_TTL() {
    return Number(this.get(EnvKey.CACHE_TTL, EnvDefault.CACHE_TTL));
  }

  get THROTTLER_TTL() {
    return Number(this.get(EnvKey.THROTTLER_TTL, EnvDefault.THROTTLER_TTL));
  }
  get THROTTLER_LIMIT() {
    return Number(this.get(EnvKey.THROTTLER_LIMIT, EnvDefault.THROTTLER_LIMIT));
  }

  get DB_POOL_MAX() {
    return Number(this.get(EnvKey.DB_POOL_MAX, EnvDefault.DB_POOL_MAX));
  }
  get DB_POOL_CONNECTION_TIMEOUT_MILLIS() {
    return Number(
      this.get(
        EnvKey.DB_POOL_CONNECTION_TIMEOUT_MILLIS,
        EnvDefault.DB_POOL_CONNECTION_TIMEOUT_MILLIS,
      ),
    );
  }
  get DB_POOL_IDLE_TIMEOUT_MILLIS() {
    return Number(
      this.get(
        EnvKey.DB_POOL_IDLE_TIMEOUT_MILLIS,
        EnvDefault.DB_POOL_IDLE_TIMEOUT_MILLIS,
      ),
    );
  }
  get DB_POOL_MAX_USES() {
    return Number(
      this.get(EnvKey.DB_POOL_MAX_USES, EnvDefault.DB_POOL_MAX_USES),
    );
  }
  get DB_POOL_STATEMENT_TIMEOUT() {
    return Number(
      this.get(
        EnvKey.DB_POOL_STATEMENT_TIMEOUT,
        EnvDefault.DB_POOL_STATEMENT_TIMEOUT,
      ),
    );
  }
  get DB_POOL_QUERY_TIMEOUT() {
    return Number(
      this.get(EnvKey.DB_POOL_QUERY_TIMEOUT, EnvDefault.DB_POOL_QUERY_TIMEOUT),
    );
  }
  get DB_POOL_LOCK_TIMEOUT() {
    return Number(
      this.get(EnvKey.DB_POOL_LOCK_TIMEOUT, EnvDefault.DB_POOL_LOCK_TIMEOUT),
    );
  }
}
