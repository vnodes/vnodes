import { readdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { cwd } from 'node:process';

export type DirsOptions = {
    recursive?: boolean;
};

export type Stat = {
    relativePath: string;
    absolutePath: string;
    fileName: string;
    isFile: boolean;
    isDirectory: boolean;
    children?: Stat[];
};

export async function dirs(rootPath: string, options?: DirsOptions): Promise<Stat[]> {
    const foundPaths = await readdir(rootPath, { encoding: 'utf8' });

    const result: Stat[] = [];

    for (const fileName of foundPaths) {
        const absolutePath = resolve(join(rootPath, fileName));
        const relativePath = absolutePath.replace(`${cwd()}/`, './');
        const __stat = await stat(absolutePath);
        const isDirectory = __stat.isDirectory();
        const isFile = __stat.isFile();
        let children: Stat[] | undefined;

        if (isDirectory && options?.recursive === true) {
            children = await dirs(absolutePath, options);
        }
        result.push({
            fileName,
            relativePath,
            absolutePath,
            isDirectory,
            isFile,
            children,
        });
    }

    return result;
}
