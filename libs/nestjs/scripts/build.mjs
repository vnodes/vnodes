import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readJsonFile, updateJsonFile, writeTextFile } from '@vnodes/fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootdir = 'nestjs';

function createFilename(packageName) {
    return packageName
        .replace(/@/g, '')
        .replace(/(nestjs|vnodes)\//, '')
        .split(/\//)
        .join('-');
}

export async function build() {
    const jsonFilePath = join(__dirname, '..', 'package.json');

    const packageJson = await readJsonFile(jsonFilePath);

    const allPackages = Object.keys(packageJson.dependencies);

    const ignoredPackages = [
        'graphql',
        'bcrypt',
        'fastify',
        'express',
        '@fastify/compress',
        '@fastify/helmet',
        'helmet',
        'compress',
        'multer',
        'pg',
    ];

    for (const packageName of allPackages) {
        if (ignoredPackages.includes(packageName)) {
            continue;
        }
        const fileName = createFilename(packageName);

        await writeTextFile(join(__dirname, '..', 'src', rootdir, `${fileName}.ts`), `export * from '${packageName}';`);
    }

    await updateJsonFile(jsonFilePath, async (value) => {
        const exports = Object.keys(value.dependencies)

            .map((e) => {
                const filename = createFilename(e);
                return [
                    `./${filename}`,
                    {
                        types: `./dist/nestjs/${filename}.d.ts`,
                        import: `./dist/nestjs/${filename}.js`,
                        default: `./dist/nestjs/${filename}.js`,
                    },
                ];
            })
            .reduce((p, [key, value]) => {
                p[key] = value;
                return p;
            }, {});

        value.exports = { ...value.exports, ...exports };
        return value;
    });
}

build();
