import { names } from '@nx/devkit';
import { copyFilesGenerator, filesGenerator, readTextFile, writeTextFile } from '@vnodes/fs';
import { type Command } from 'commander';
import ejs from 'ejs';
import { mkdir } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getWorkspaceVersion } from '../../utils/get-workspace-version.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function geneateFiles(name: string) {
  const removeTemplateSuffix = (filePath: string) => {
    return filePath.slice(0, -'.template'.length);
  };
  const copyFilesGeneartor = copyFilesGenerator(
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
  const templateFiles = filesGenerator(templateRootDir);

  for await (const filePath of templateFiles) {
    const templateFileContent = await readTextFile(filePath);
    const relativeTemplateFilePath = relative(templateRootDir, filePath).slice(0, -'.ejs'.length);

    const targetFilePath = join(name, relativeTemplateFilePath);
    await mkdir(dirname(targetFilePath), { recursive: true });

    const workspaceVersion = await getWorkspaceVersion();

    const renderedContent = ejs.render(templateFileContent, {
      ...names(name),
      email: `${name}@${name}.com`,
      workspaceVersion,
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
