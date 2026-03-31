import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const plugin = join(__dirname,'..', 'node_modules/.bin/protoc-gen-ts_proto')
const protodir = join(__dirname,'..', 'proto')
const protofile = join(__dirname,'..', 'proto', 'sample-service.proto')
const output = join(__dirname, '..', 'src/generated')

execSync(`
    protoc \
  --plugin="${plugin}"\
  --ts_proto_out="${output}" \
  --ts_proto_opt=nestJs=true \
  --ts_proto_opt=snakeToCamel=true \
  --ts_proto_opt=forceLong=number \
  -I "${protodir}" \
  "${protofile}"
    `,{ stdio: 'inherit' })
