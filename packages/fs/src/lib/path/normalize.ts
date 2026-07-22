import { join } from 'node:path';

const sepexp = /[\\|/]{1,}/g;
export function normalize(...paths: string[]) {
  return join(...paths).replace(sepexp, '/');
}
