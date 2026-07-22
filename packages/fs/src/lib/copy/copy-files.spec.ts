import { describe, it, expect, vi, beforeEach } from 'vitest';
import { copyFilesGenerator } from './copy-files.js';
import { filesGenerator } from '../path/files.js';
import { mkdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

// Mock the filesGenerator module
vi.mock('../path/files.js', () => ({
  filesGenerator: vi.fn(),
}));

// Mock node:fs/promises
vi.mock('node:fs/promises', () => ({
  mkdir: vi.fn().mockResolvedValue('test'),
  copyFile: vi.fn().mockResolvedValue('test'),
}));

describe('copyFiles()', () => {
  const sourceRoot = '/src';
  const targetRoot = '/dist';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Helper to convert an async generator into an array of yields
  async function consumeGenerator<T>(generator: AsyncGenerator<T>): Promise<T[]> {
    const results: T[] = [];
    for await (const value of generator) {
      results.push(value);
    }
    return results;
  }

  it('should correctly copy files preserving nested directory structures', async () => {
    // Arrange: Mock filesGenerator to stream two nested files
    const mockedFiles = [join(sourceRoot, 'index.ts'), join(sourceRoot, 'modules/user/user.service.ts')];

    vi.mocked(filesGenerator).mockReturnValue(
      (async function* () {
        for (const file of mockedFiles) yield file;
      })() as any,
    );

    // Act
    const generator = copyFilesGenerator(sourceRoot, targetRoot);
    const yieldedPaths = await consumeGenerator(generator);

    // Assert: Expected output targets
    const expectedTarget1 = join(targetRoot, 'index.ts');
    const expectedTarget2 = join(targetRoot, 'modules/user/user.service.ts');

    expect(yieldedPaths).toEqual([expectedTarget1, expectedTarget2]);

    // Verify directories were created recursively
    expect(mkdir).toHaveBeenCalledWith(targetRoot, { recursive: true });
    expect(mkdir).toHaveBeenCalledWith(join(targetRoot, 'modules/user'), { recursive: true });

    // Verify correct files were copied to correct destinations
    expect(copyFile).toHaveBeenCalledWith(mockedFiles[0], expectedTarget1);
    expect(copyFile).toHaveBeenCalledWith(mockedFiles[1], expectedTarget2);
  });

  it('should apply piping transformation functions to the target path', async () => {
    // Arrange
    const mockedFiles = [join(sourceRoot, 'user.service.ts')];
    vi.mocked(filesGenerator).mockReturnValue(
      (async function* (): any {
        for (const file of mockedFiles) yield file;
      })() as any,
    );

    // Define transformation pipes (e.g., changing extension, rewriting directory names)
    const replaceTsWithJs = (path: string) => path.replace(/\.ts$/, '.js');
    const changeToOutput = (path: string) => path.replace('/dist', '/output');

    // Act
    const generator = copyFilesGenerator(sourceRoot, targetRoot, replaceTsWithJs, changeToOutput);
    const yieldedPaths = await consumeGenerator(generator);

    // Assert
    const expectedFinalPath = '/output/user.service.js';
    expect(yieldedPaths).toEqual([expectedFinalPath]);

    expect(mkdir).toHaveBeenCalledWith('/output', { recursive: true });
    expect(copyFile).toHaveBeenCalledWith(mockedFiles[0], expectedFinalPath);
  });

  it('should handle an empty source directory gracefully', async () => {
    // Arrange: Stream yields nothing
    vi.mocked(filesGenerator).mockReturnValue(
      (async function* () {
        yield '';
      })() as any,
    );

    // Act
    const generator = copyFilesGenerator(sourceRoot, targetRoot);
    const yieldedPaths = await consumeGenerator(generator);

    // Assert
    expect(yieldedPaths).toBeDefined();
    expect(mkdir).toHaveBeenCalledOnce();
    expect(copyFile).toHaveBeenCalledOnce();
  });
});
