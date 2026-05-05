import * as path from 'node:path';
import { cwd } from 'node:process';
import { generateFiles, type Tree } from '@nx/devkit';
import type { SitemapGeneratorSchema } from './schema';

export async function sitemapGenerator(tree: Tree, options: SitemapGeneratorSchema) {
    const lastModDate = new Date().toDateString();
    const baseUrl = options.baseUrl ?? 'https://vnodes.github.io';
    const pages = options.pages ?? ['home', 'about', 'services', 'products'];
    generateFiles(tree, path.join(__dirname, 'files'), cwd(), {
        lastModDate,
        baseUrl,
        pages,
    });
}

export default sitemapGenerator;
