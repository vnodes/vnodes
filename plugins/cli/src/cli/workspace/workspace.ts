import { copyFiles } from '@vnodes/fs';
import { Command } from 'commander';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdir } from 'node:fs/promises';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import ejs from 'ejs';
import { names } from '@nx/devkit';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function geneateFiles(name: string) {
  await copyFiles(join(__dirname, 'files'), join(name), (filePath: string) => {
    return filePath.slice(0, -'.template'.length);
  });
}

async function generateTemplates(name: string) {
  const templateRootDir = join(__dirname, 'templates');
  const templateFiles = await readdir(templateRootDir, { recursive: true, withFileTypes: true });

  for (const t of templateFiles) {
    if (!t.isFile()) continue;

    const templateFilePath = join(t.parentPath, t.name);
    const templateFileContent = readFileSync(templateFilePath, { encoding: 'utf-8' });
    const targetTemplateFilePath = join('./', name, templateFilePath.replace(templateRootDir, '')).slice(0, -'.ejs'.length);

    mkdirSync(dirname(targetTemplateFilePath), { recursive: true });
    const renderedContent = ejs.render(templateFileContent, { ...names(name), email: `${name}@${name}.com` });
    writeFileSync(targetTemplateFilePath, renderedContent, { encoding: 'utf-8' });
  }
}

/**
 * Say workspace
 *
 * ### Example
 * ````sh
 *  vnodes workspace --username YourName
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
