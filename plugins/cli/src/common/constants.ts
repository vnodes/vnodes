import { readJsonFile } from '@vnodes/fs';
import { type PackageJson } from '@vnodes/types';

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

async function workspaceVersion() {
  const packageJson = await readJsonFile<PackageJson>(
    join(__dirname, '..', '..', 'package.json'),
  );
  return packageJson.version;
}

export const WORKSPACE_VERSION = await workspaceVersion();
