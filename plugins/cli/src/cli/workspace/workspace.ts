import { names } from '@nx/devkit';
import { copyFiles, files, readTextFile, writeTextFile } from '@vnodes/fs';
import { type Command } from 'commander';
import ejs from 'ejs';
import { mkdir } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WORKSPACE_VERSION } from '../../common/constants.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function geneateFiles(name: string) {
  const removeTemplateSuffix = (filePath: string) => {
    return filePath.slice(0, -'.template'.length);
  };
  const copyFilesGeneartor = copyFiles(
    join(__dirname, 'files'),
    join(name),
    removeTemplateSuffix,
  );

  for await (const entry of copyFilesGeneartor) {
    console.log(`[ Created ] ${entry}`);
  }
}

async function generateTemplates(name: string) {
  const templateRootDir = join(__dirname, 'templates');
  const templateFiles = files(templateRootDir);

  for await (const fileEntry of templateFiles) {
    const fullFilePath = join(fileEntry.parentPath, fileEntry.name);
    const templateFileContent = await readTextFile(fullFilePath);
    const relativeTemplateFilePath = relative(
      templateRootDir,
      fullFilePath,
    ).slice(0, -'.ejs'.length);

    const targetFilePath = join(name, relativeTemplateFilePath);
    await mkdir(dirname(targetFilePath), { recursive: true });

    const renderedContent = ejs.render(templateFileContent, {
      ...names(name),
      email: `${name}@${name}.com`,
      workspaceVersion: WORKSPACE_VERSION,
    });

    await writeTextFile(targetFilePath, renderedContent);
    console.log(`[ Created ] ${relativeTemplateFilePath} `);
  }
}

/**
 * Generate nx workspace
 *
 * ### Example
 * ````sh
 *  vnodes workspace --name WorkSpaceName
 * ````
 * @param command main command instance
 */
export function workspace(command: Command) {
  command
    .command('workspace')
    .description('Generate a nx workspace')
    .requiredOption('-n, --name <string>', 'Project name')
    .action(async ({ name }) => {
      await geneateFiles(name);
      await generateTemplates(name);
    });
}
