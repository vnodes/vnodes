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
      '**/generated/*',
      '**/vitest.config.*.timestamp*',
      '**/prisma.config.ts',
      '**/vitet.config.mjs',
      '**/vitest.workspace.ts',
      '**/generated/**',
      '**/eslint.config.mjs',
    ],
  },
];
