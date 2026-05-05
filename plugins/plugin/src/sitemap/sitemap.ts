import * as path from 'node:path';
import * as process from 'node:process';
import { generateFiles, type Tree, workspaceRoot } from '@nx/devkit';
import type { SitemapGeneratorSchema } from './schema';

export async function sitemapGenerator(tree: Tree, options: SitemapGeneratorSchema) {
    const lastModDate = new Date().toISOString().split('T')[0];
    const baseUrl = options.baseUrl ?? 'https://vnodes.github.io';
    const pages = options.pages
        ? options.pages.split(',').map((e) => e.trim())
        : ['home', 'about', 'services', 'products'];
    generateFiles(tree, path.join(__dirname, 'files'), path.relative(workspaceRoot, process.cwd()), {
        lastModDate,
        baseUrl,
        pages,
    });
}

export default sitemapGenerator;
