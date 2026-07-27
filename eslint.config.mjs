import nx from '@nx/eslint-plugin';
import eslintBase from './.eslint/eslint.base.mjs';

export default [
  ...eslintBase,
  {
    ignores: ['**/vitest.config.*.timestamp*'],
  },
  {
    files: ['**/*.json'],
    // Override or add rules here
    rules: {},
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
];
