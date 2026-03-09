import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
    root: __dirname,
    cacheDir: '../../tmp/.vite/apps/ctc-e2e',
    plugins: [nxViteTsPaths()],
    test: {
        name: 'ctc-e2e',
        watch: false,
        globals: true,
        environment: 'node',
        include: ['{src,tests}/**/*.{test,spec}.ts'],
        reporters: ['default'],
        coverage: {
            reportsDirectory: '../../coverage/apps/ctc-e2e',
            provider: 'v8' as const,
        },
    },
}));
