import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const errors = [
    'AccessDenied',
    'Required',
    'Undefined',
    'Null',
    'NotImplemented',
    'NotNumber',
    'NotString',
    'NotBoolean',
    'NotObject',
    'EmptyString',
    'InvalidDate',
    'Unsupported'
];

const set = new Set();

const createError = (name) => {
    name = `${name}Error`;

    return [
        `export class ${name} extends Error {`,
        `    constructor(message = '') {`,
        `        super(message);`,
        `        Object.setPrototypeOf(this, ${name}.prototype);`,
        `        this.name = this.constructor.name;`,
        `        if (Error.captureStackTrace) {`,
        `            Error.captureStackTrace(this, this.constructor);`,
        `        }`,
        `    }`,
        `}`,
    ].join('\n');
};

for (const e of errors) {
    set.add(createError(e));
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const errorsContent = [...set].join('\n');
writeFileSync(join(__dirname, '..', 'src', 'lib', 'errors.ts'), errorsContent);
