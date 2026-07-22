import { readJsonFile } from '@vnodes/fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function getWorkspaceVersion() {
  const packageJson = await readJsonFile<{ version: string }>(join(__dirname, '../package.json'));

  return packageJson.version;
}
