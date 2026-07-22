import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { filesGenerator } from '../path/files.js';

/**
 * Copy files recursively by consuming a streaming files generator.
 * @param sourcePath Base source directory
 * @param targetPath Base destination directory
 * @param pipes Transformation functions for the destination path
 */
export async function* copyFilesGenerator(
  sourcePath: string,
  targetPath: string,
  ...pipes: ((path: string) => string)[]
): AsyncGenerator<string, void, unknown> {
  // Consume the stream of file paths directly
  const files = filesGenerator(sourcePath);

  for await (const currentSourcePath of files) {
    // 1. Isolate the nested folder path structure relative to the root sourcePath
    // E.g., relative('src', 'src/modules/user/user.service.ts') -> 'modules/user/user.service.ts'
    const relativeFilePath = relative(sourcePath, currentSourcePath);

    // 2. Append that clean relative path directly onto your output folder base
    const resolvedTargetPath = join(targetPath, relativeFilePath);

    // 3. Apply transformations if pipes exist
    const finalTargetPath =
      pipes.length > 0 ? pipes.reduce((acc, currentPipe) => currentPipe(acc), resolvedTargetPath) : resolvedTargetPath;

    // 4. Ensure directory exists and copy the file
    await mkdir(dirname(finalTargetPath), { recursive: true });
    await copyFile(currentSourcePath, finalTargetPath);

    // 5. Yield the final target path back to the consumer
    yield finalTargetPath;
  }
}
