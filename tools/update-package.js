#!/usr/bin/env node

const { readJsonFile, updateJson, updateNxJson } = require('@nx/devkit');
const { updateJsonFile } = require('@vnodes/fs');
const { readdirSync } = require('node:fs');
const { join } = require('node:path');

function updatePackageJson(root, updateHandler) {
  const projectRoots = readdirSync(join(__dirname, '..', root), {
    withFileTypes: true,
  })
    .filter((e) => e.isDirectory())
    .map((e) => `${e.parentPath}/${e.name}`);

  for (const rootPath of projectRoots) {
   await  updateJsonFile(join(rootPath, 'package.json'), (value) => {
      console.log(value.name);
      return value;
    });
  }
}

updatePackageJson('packages', () => ({}));
