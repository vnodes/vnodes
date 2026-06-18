import { copyFilesGenerator, filesGenerator, readTextFile, writeTextFile } from '@vnodes/fs';
import { type Command } from 'commander';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import ejs from 'ejs';
import { names } from '@nx/devkit';
import { mkdir } from 'node:fs/promises';
import { cwd } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function geneateFiles(name: string) {
  const removeTemplateSuffix = (filePath: string) => {
    return filePath.slice(0, -'.template'.length);
  };
  const copyFilesGeneartor = copyFilesGenerator(join(__dirname, 'files'), join(name), removeTemplateSuffix);

  for await (const entry of copyFilesGeneartor) {
    console.log(`[ Created ] ${entry}`);
  }
}

async function generateTemplates(name: string) {
  const templateRootDir = join(__dirname, 'templates');
  const templateFiles = filesGenerator(templateRootDir);

  for await (const filePath of templateFiles) {
    const templateFilePath = join(filePath, basename(filePath));
    const templateFileContent = await readTextFile(templateFilePath);
    const targetTemplateFilePath = relative(cwd(), templateFilePath).slice(0, -'.ejs'.length);

    await mkdir(dirname(targetTemplateFilePath), { recursive: true });
    const renderedContent = ejs.render(templateFileContent, { ...names(name), email: `${name}@${name}.com` });
    await writeTextFile(targetTemplateFilePath, renderedContent);
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
