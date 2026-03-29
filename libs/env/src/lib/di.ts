export class DI {
    static readonly DEFAULT = 'DEFAULT';
    static readonly DB_CLIENT = 'DB_CLIENT';
    static readonly DB_REPOSITORY = 'DB_REPOSITORY';

    readonly DB_CLIENT: string;
    readonly DB_REPOSITORY: string;

    constructor(private readonly _prefix = '') {
        this.DB_CLIENT = this.pre(DI.DB_CLIENT);
        this.DB_REPOSITORY = this.pre(DI.DB_REPOSITORY);
    }

    private pre(key: string) {
        return `${this.prefix}${key}`;
    }
    private get prefix() {
        return (this._prefix ? `${this._prefix}_` : '').toUpperCase() as Uppercase<string>;
    }
}
