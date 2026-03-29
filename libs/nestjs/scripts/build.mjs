// import { dirname, join } from 'node:path';
// import { fileURLToPath } from 'node:url';
// import { updateJsonFile } from '@vnodes/fs';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export async function build() {
//     const jsonFilePath = join(__dirname, '..', 'package.json');

//     updateJsonFile(jsonFilePath, async (value) => {
//         const exports = Object.keys(value.dependencies)
//             .map((e) => s.split(/\//).pop())
//             .map((e) => {
//                 return [
//                     `./${e}`,
//                     {
//                         types: `./dist/${e}/index.d.ts`,
//                         import: `./dist/${e}/index.js`,
//                         default: `./dist/${e}/index.js`,
//                     },
//                 ];
//             })
//             .reduce((p, [key, value]) => {
//                 p[key] = value;
//                 return p;
//             }, {});

//         value.exports = { ...value.exports, ...exports };
//         return value;
//     });
// }
