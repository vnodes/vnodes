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
      '**/generated/prisma/**',
      '**/generated/nest/**',
      '**/vitest.config.*.timestamp*',
      '**/prisma.config.ts',
      '**/vitet.config.mjs',
      '**/vitest.workspace.ts',
      '**/eslint.config.mjs',
    ],
  },
];
