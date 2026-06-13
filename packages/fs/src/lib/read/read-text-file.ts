import { readFile } from 'node:fs/promises';

export async function readTextFile(
  filepath: string,
  abortController?: AbortController,
): Promise<string> {
  return await readFile(filepath, {
    encoding: 'utf-8',
    signal: abortController?.signal,
  });
}
