export class Env {
    static readonly APP_ID = 'APP_ID';
    static readonly APP_DESCRIPTION = 'APP_DESCRIPTION';
    static readonly PORT = 'PORT';
    static readonly HOST = 'HOST';
    static readonly DATABASE_NAME = 'DATABASE_NAME';
    static readonly DATABASE_URL = 'DATABASE_URL';
    static readonly DATABASE_SCHEMA = 'DATABASE_SCHEMA';
    static readonly API_PREFIX = 'API_PREFIX';

    readonly APP_ID: string;
    readonly APP_DESCRIPTION: string;
    readonly PORT: string;
    readonly HOST: string;
    readonly DATABASE_NAME: string;
    readonly DATABASE_URL: string;
    readonly DATABASE_SCHEMA: string;
    readonly API_PREFIX: string;

    constructor(private readonly _prefix = '') {
        this.APP_ID = this.pre(Env.APP_ID);
        this.APP_DESCRIPTION = this.pre(Env.APP_DESCRIPTION);
        this.PORT = this.pre(Env.PORT);
        this.HOST = this.pre(Env.HOST);
        this.DATABASE_NAME = this.pre(Env.DATABASE_NAME);
        this.DATABASE_URL = this.pre(Env.DATABASE_URL);
        this.DATABASE_SCHEMA = this.pre(Env.DATABASE_SCHEMA);
        this.API_PREFIX = this.pre(Env.API_PREFIX);
    }

    private pre(key: string) {
        return `${this.prefix}${key}`;
    }
    private get prefix() {
        return (this._prefix ? `${this._prefix}_` : '').toUpperCase() as Uppercase<string>;
    }
}
