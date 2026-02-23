export function printCommonCode() {
    return [
        `import type { Prisma as P } from './client.js';`,

        `export type QueryMany<T> = {`,
        `    take?: number;`,
        `    skip?: number;`,
        `    search?: string;`,
        `    orderBy?:T`,
        `    orderDir?: P.SortOrder`,
        `    withDeleted?: boolean`,
        `};`,
    ].join('\n');
}
