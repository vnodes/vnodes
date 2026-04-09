import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readTextFile, writeTextFile } from '@vnodes/fs'


const __dirname = dirname(fileURLToPath(import.meta.url));
const serviceName = 'sample-service'
const plugin = join(__dirname, '..', 'node_modules/.bin/protoc-gen-ts_proto');
const protodir = join(__dirname, '..', 'proto');
const protofile = join(__dirname, '..', 'proto', `${serviceName}.proto`);
const output = join(__dirname, '..', 'src/generated/proto');
const outputFile = join(output, `${serviceName}.ts`);



const script = `
    npx protoc \
    --plugin="${plugin}"\
    --ts_proto_out="${output}" \
    --ts_proto_opt=nestJs=true \
    --ts_proto_opt=snakeToCamel=true \
    --ts_proto_opt=forceLong=number \
    --ts_proto_opt=useDate=true \
    --ts_proto_opt=outputJsonMethods=true \
    -I "${protodir}" \
    "${protofile}"`

const linting = [
    "/** biome-ignore-all lint/suspicious/noShadowRestrictedNames:BIOME*/",
    "/** biome-ignore-all lint/complexity/useArrowFunction:BIOME*/",
    "/** biome-ignore-all lint/complexity/noBannedTypes:BIOME*/",
].join('\n')

async function build() {

    await writeTextFile(outputFile, '')
    execSync(script, { stdio: 'inherit' });
    const content = await readTextFile(outputFile)
    const fullContent = [linting, content].join('\n')
    await writeTextFile(outputFile, fullContent);
}

build()