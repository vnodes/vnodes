export default [
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
              onlyDependOnLibsWithTags: ['lib:core', 'lib:module', 'lib:shared', 'lib:types'],
            },
            {
              sourceTag: 'app:api',
              onlyDependOnLibsWithTags: ['app:db', 'lib:core', 'lib:module', 'lib:shared', 'lib:types'],
            },
            {
              sourceTag: 'lib:core',
              onlyDependOnLibsWithTags: ['lib:module', 'lib:shared', 'lib:types'],
            },
            {
              sourceTag: 'lib:module',
              onlyDependOnLibsWithTags: ['lib:module', 'lib:shared', 'lib:types'],
            },
            {
              sourceTag: 'lib:shared',
              onlyDependOnLibsWithTags: ['lib:shared', 'lib:types'],
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
];
