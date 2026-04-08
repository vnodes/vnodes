import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readTextFile, writeTextFile } from '@vnodes/nestjs/fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const plugin = join(__dirname, '..', 'node_modules/.bin/protoc-gen-ts_proto')
const protodir = join(__dirname, '..', 'proto')
const protofile = join(__dirname, '..', 'proto', 'sample-service.proto')
const output = join(__dirname, '..', 'src/generated')

const outputfile = join(output, 'sample-service.ts')



async function build() {
    const result = execSync(`
       npx protoc \
        --plugin="${plugin}"\
        --ts_proto_out="${output}" \
        --ts_proto_opt=nestJs=true \
        --ts_proto_opt=snakeToCamel=true \
        --ts_proto_opt=forceLong=number \
        --ts_proto_opt=useDate=true \
        --ts_proto_opt=outputJsonMethods=true \
        -I "${protodir}" \
        "${protofile}"
    `, { stdio: 'inherit' });



    const linting = `    

/** biome-ignore-all lint/suspicious/noShadowRestrictedNames:BIOME*/
/** biome-ignore-all lint/complexity/useArrowFunction:BIOME*/
/** biome-ignore-all lint/complexity/noBannedTypes:BIOME*/

`





    const content = await readTextFile(outputfile)


    await writeTextFile(outputfile, [
        linting,
        content
    ].join('\n'))



}



build()