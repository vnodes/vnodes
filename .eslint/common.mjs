import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  {
    ignores: [
      '**/dist',
      '**/out-tsc',
      '**/generated/*',
      '**/vitest.config.*.timestamp*',
      '**/prisma.config.ts',
      '**/vitet.config.mjs',
      '**/generated/**',
      '**/eslint.config.mjs',
    ],
  },
];
