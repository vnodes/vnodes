import { copyFiles } from '@vnodes/fs';
import { Command } from 'commander';
import { dirname, join } from 'node:path';
import { cwd } from 'node:process';
import { fileURLToPath } from 'node:url';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function geneateFiles(name: string) {
  await copyFiles(join(__dirname, 'files'), join(cwd(), name), (filePath: string) => {
    return filePath.slice(0, -'.template'.length);
  });
}

async function generateTemplates(name: string) {
  const templateFiles = await readdir(join(__dirname, 'templates'), { recursive: true, withFileTypes: true });

  for (const t of templateFiles) {
    if (!t.isFile()) continue;

    const templateContent = readFileSync(join(t.parentPath, t.name), { encoding: 'utf-8' });
    const targetFilePath = join(cwd(), name, t.parentPath, t.name.slice(0, -'.ejs'.length));
    mkdirSync(dirname(targetFilePath), { recursive: true });
    writeFileSync(targetFilePath, templateContent, { encoding: 'utf-8' });
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
