import { readJsonFile } from '@nx/devkit';

const packageJson = readJsonFile('package.json');

export default [
  {
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [`${packageJson.name}`],
        },
      ],
    },
  },
];
