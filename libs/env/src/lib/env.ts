export class Env {
    static readonly NODE_ENV = 'NODE_ENV';
    static readonly APP_ID = 'APP_ID';
    static readonly APP_DESC = 'APP_DESC';
    static readonly PORT = 'PORT';
    static readonly HOST = 'HOST';
    static readonly API_PREFIX = 'API_PREFIX';

    static readonly ALLOWED_ORIGINS = 'ALLOWED_ORIGINS';

    static readonly DB_NAME = 'DB_NAME';
    static readonly DB_URL = 'DB_URL';
    static readonly DB_SCHEMA = 'DB_SCHEMA';

    static readonly DB_POOL_MAX = 'DB_POOL_MAX';
    static readonly DB_POOL_CONNECTION_TIMEOUT_MILLIS = 'DB_POOL_CONNECTION_TIMEOUT_MILLIS';
    static readonly DB_POOL_IDLE_TIMEOUT_MILLIS = 'DB_POOL_IDLE_TIMEOUT_MILLIS';
    static readonly DB_POOL_MAX_USES = 'DB_POOL_MAX_USES';
    static readonly DB_POOL_STATEMENT_TIMEOUT = 'DB_POOL_STATEMENT_TIMEOUT';
    static readonly DB_POOL_QUERY_TIMEOUT = 'DB_POOL_QUERY_TIMEOUT';
    static readonly DB_POOL_LOCK_TIMEOUT = 'DB_POOL_LOCK_TIMEOUT';

    readonly APP_ID: string;
    readonly APP_DESC: string;
    readonly PORT: string;
    readonly HOST: string;
    readonly API_PREFIX: string;

    readonly DB_NAME: string;
    readonly DB_URL: string;
    readonly DB_SCHEMA: string;

    readonly DB_POOL_MAX: string;
    readonly DB_POOL_CONNECTION_TIMEOUT_MILLIS: string;
    readonly DB_POOL_IDLE_TIMEOUT_MILLIS: string;
    readonly DB_POOL_MAX_USES: string;
    readonly DB_POOL_STATEMENT_TIMEOUT: string;
    readonly DB_POOL_QUERY_TIMEOUT: string;
    readonly DB_POOL_LOCK_TIMEOUT: string;

    constructor(private readonly _prefix = '') {
        this.APP_ID = this.pre(Env.APP_ID);
        this.APP_DESC = this.pre(Env.APP_DESC);
        this.PORT = this.pre(Env.PORT);
        this.HOST = this.pre(Env.HOST);
        this.API_PREFIX = this.pre(Env.API_PREFIX);

        this.DB_NAME = this.pre(Env.DB_NAME);
        this.DB_URL = this.pre(Env.DB_URL);
        this.DB_SCHEMA = this.pre(Env.DB_SCHEMA);

        this.DB_POOL_MAX = this.pre(Env.DB_POOL_MAX);
        this.DB_POOL_CONNECTION_TIMEOUT_MILLIS = this.pre(Env.DB_POOL_CONNECTION_TIMEOUT_MILLIS);
        this.DB_POOL_IDLE_TIMEOUT_MILLIS = this.pre(Env.DB_POOL_IDLE_TIMEOUT_MILLIS);
        this.DB_POOL_MAX_USES = this.pre(Env.DB_POOL_MAX_USES);
        this.DB_POOL_STATEMENT_TIMEOUT = this.pre(Env.DB_POOL_STATEMENT_TIMEOUT);
        this.DB_POOL_QUERY_TIMEOUT = this.pre(Env.DB_POOL_QUERY_TIMEOUT);
        this.DB_POOL_LOCK_TIMEOUT = this.pre(Env.DB_POOL_LOCK_TIMEOUT);
    }

    private pre(key: string) {
        return `${this.prefix}${key}`;
    }
    private get prefix() {
        return (this._prefix ? `${this._prefix}_` : '').toUpperCase() as Uppercase<string>;
    }
}
