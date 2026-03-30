export class DI {
    static readonly DEFAULT = 'DEFAULT';
    static readonly DB_CLIENT = 'DB_CLIENT';
    static readonly DB_REPO = 'DB_REPO';

    readonly DB_CLIENT: string;
    readonly DB_REPO: string;

    constructor(private readonly _prefix = '') {
        this.DB_CLIENT = this.pre(DI.DB_CLIENT);
        this.DB_REPO = this.pre(DI.DB_REPO);
    }

    private pre(key: string) {
        return `${this.prefix}${key}`;
    }
    private get prefix() {
        return (this._prefix ? `${this._prefix}_` : '').toUpperCase() as Uppercase<string>;
    }
}
