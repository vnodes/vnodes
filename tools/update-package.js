#!/usr/bin/env node

const { readJsonFile, updateJson, updateNxJson } = require('@nx/devkit');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');

function updatePackageJson(root, updateHandler) {
  const projectRoots = readdirSync(join(__dirname, '..', root), {
    withFileTypes: true,
  })
    .filter((e) => e.isDirectory())
    .map((e) => `${e.parentPath}/${e.name}`);

  console.log(projectRoots);

  for (const rootPath of projectRoots) {
  }
}

updatePackageJson('packages', () => ({}));
