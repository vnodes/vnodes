import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readJsonFile, updateJsonFile, writeTextFile } from '@vnodes/fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function build() {
    const jsonFilePath = join(__dirname, '..', 'package.json');

    const packageJson = await readJsonFile(jsonFilePath);

    const dependencies = Object.keys(packageJson.dependencies);

    for (const d of dependencies) {
        if (d === 'fastify' || d === 'express' || d === '@fastify/compress' || d === '@fastify/helmet') {
            continue;
        }
        const fileName = d.split(/\//).join('-').replace('@', '');

        await writeTextFile(join(__dirname, '..', 'src', `${fileName}.ts`), `export * from '${d}';`);
    }
    await updateJsonFile(jsonFilePath, async (value) => {
        const exports = Object.keys(value.dependencies)
            .map((e) => {
                return e.split(/\//).join('-').replace('@', '');
            })
            .map((e) => {
                return [
                    `./${e}`,
                    {
                        types: `./dist/${e}.d.ts`,
                        import: `./dist/${e}.js`,
                        default: `./dist/${e}.js`,
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
