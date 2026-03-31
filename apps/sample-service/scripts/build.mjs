import { execSync } from "node:child_process";
import { join } from "node:path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


console.log('building');
const plugin = join('..', 'node_modules/.bin/protoc-gen-ts_proto')

const protodir = join('..', 'proto')
const protofile = join('..', 'proto', 'sample-service.proto')

execSync(`
    protoc \
  --plugin= ${plugin}\
  --ts_proto_out=./src/generated \
  --ts_proto_opt=nestJs=true \
  --ts_proto_opt=fileSuffix=.ts \
  --ts_proto_opt=snakeToCamel=true \
  --ts_proto_opt=forceLong=number \
  -I ${protodir} \
  ${protofile}
    `)
