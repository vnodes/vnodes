import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';

export async function copyFiles(sourcePath: string, targetPath: string, ...pipes: ((path: string) => string)[]) {
  const items = await readdir(sourcePath, { recursive: true, withFileTypes: true });

  for (const item of items) {
    if (!item.isFile()) continue;

    // 1. Extract the actual source path of the file without duplication
    const __sourcePath = join(item.parentPath, item.name);

    // 2. Isolate the nested folder path structure (e.g., 'modules/user/user.service.ts')
    const relativeFilePath = relative(sourcePath, __sourcePath);

    // 3. Append that clean relative path directly onto your output folder base
    const __resolvedTargetPath = join(targetPath, relativeFilePath);

    const __targetPath =
      pipes.length > 0 ? pipes.reduce((acc, currentPipe) => currentPipe(acc), __resolvedTargetPath) : __resolvedTargetPath;

    await mkdir(dirname(__targetPath), { recursive: true });
    await copyFile(__sourcePath, __targetPath);
  }
}
