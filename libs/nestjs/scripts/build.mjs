import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readJsonFile, updateJsonFile, writeTextFile } from '@vnodes/fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJsonPath = join(__dirname, '..', 'package.json');

const manualPackages = [
    "@fastify/compress",
    "@fastify/helmet",
    "@types/express",
    "@types/multer",
    'multer',
    "cache-manager",
    "express",
    "fastify",
]

function fileName(packageName) {
    return packageName
        .replace(/@/g, '')
        .replace(/(nestjs|vnodes)\//, '')
        .split(/\//)
        .join('-');
}


export function filePath(fileName) {
    return join(__dirname, '..', 'src', 'nestjs', `${fileName}.ts`)
}

export function createExport(fileName, dir = 'nestjs') {
    const exportName = `./${fileName}`;
    return {
        [exportName]: {
            types: `./dist/${dir}/${fileName}.d.ts`,
            import: `./dist/${dir}/${fileName}.js`,
            default: `./dist/${dir}/${fileName}.js`,
        }
    }
}

export async function writeBarralFile(packageName) {
    await writeTextFile(filePath(fileName(packageName)), `export * from '${packageName}';`);
}



export async function build() {

    const packageJson = await readJsonFile(packageJsonPath);
    const peerDependencies = Object.keys(packageJson.peerDependencies).filter(packageName => {
        return !manualPackages.includes(packageName)
    })

    // Create a barral file such as common.ts and write export * from @nestjs/common in it
    for (const packageName of peerDependencies) {
        await writeBarralFile(packageName)
    }
    const manualExports = manualPackages.map(packageName => createExport(packageName, 'manual'))
        .reduce((p, c) => {
            return { ...p, ...c }
        }, {})

    const packageExports = peerDependencies
        .map(packageName => createExport(fileName(packageName)))
        .reduce((p, c) => {
            return { ...p, ...c }
        }, {})



    await updateJsonFile(packageJsonPath, async (value) => {
        if (!value.exports) {
            value.exports = {};
        }

        value.exports = { ...value.exports, ...packageExports, ...manualExports }
        return value;
    });
}

build();
