import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readJsonFile, updateJsonFile, writeTextFile } from '@vnodes/fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJsonPath = join(__dirname, '..', 'package.json');

const manualPackages = [
    "@as-integrations/fastify",
    "@fastify/compress",
    "@fastify/helmet",
    "@fastify/static",
    "@types/express",
    "@types/multer",
    'multer',
    "cache-manager",
    "express",
    "fastify",
]

const fileNameMap = {
    "cache-manager": 'cache'
}

function fileName(packageName) {
    if (fileNameMap[packageName]) {
        return fileNameMap[packageName]
    }

    const filename = packageName
        .replace(/@/g, '')
        .replace(/(nestjs|vnodes)\//, '')
        .split(/\//)
        .join('-');

    return `${filename}`
}


export function filePath(fileName) {
    return join(__dirname, '..', 'src', 'nestjs', `${fileName}.ts`)
}

export function __createExport(exportName, dir, fileName) {
    return {
        [exportName]: {
            types: `./dist/${dir}/${fileName}.d.ts`,
            import: `./dist/${dir}/${fileName}.js`,
            default: `./dist/${dir}/${fileName}.js`,
        }
    }
}
export function createExport(fileName, dir = 'nestjs') {
    const exportName = `./${fileName}`;
    return __createExport(exportName, dir, fileName)
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
    const manualExports = manualPackages.map(packageName => createExport(fileName(packageName, 'manual'), 'manual'))
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
