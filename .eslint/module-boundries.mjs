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
              sourceTag: 'app:api',
              onlyDependOnLibsWithTags: [
                'lib:module',
                'lib:shared',
                'lib:types',
              ],
            },
            {
              sourceTag: 'lib:module',
              onlyDependOnLibsWithTags: [
                'lib:shared',
                'lib:types',
                'lib:module',
              ],
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
];
