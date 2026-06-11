import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/out',
      '**/out-tsc',
      '**/vitest.config.*.timestamp*',
      '**/vitet.config.mjs',
      '**/generated/**',
      '**/eslint.config.mjs',
    ],
  },

  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: [
            '{projectRoot}/eslint.config.mjs',
            '{projectRoot}/prisma.config.mts',
            '{projectRoot}/vitest.config.mts',
          ],
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },

  {
    files: ['**/*.ts', '**/package.json'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.mjs$'],

          depConstraints: [
            {
              sourceTag: 'app:*',
              onlyDependOnLibsWithTags: ['lib:core', 'lib:shared', 'lib:types'],
            },
            {
              sourceTag: 'lib:core',
              onlyDependOnLibsWithTags: ['lib:shared', 'lib:types'],
            },
            {
              sourceTag: 'lib:shared',
              onlyDependOnLibsWithTags: ['lib:types'],
            },
            {
              sourceTag: 'lib:types',
              onlyDependOnLibsWithTags: ['no:dependency'],
            },
          ],
        },
      ],
    },
  },

  {
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          // Catches any function or decorator call where 'undefined' is explicitly passed
          selector:
            "CallExpression[arguments.length=1] > Identifier[name='undefined']",
          message:
            "Do not pass 'undefined' explicitly. Rely on the default parameter value by omitting the argument entirely.",
        },
      ],
    },
  },
];
