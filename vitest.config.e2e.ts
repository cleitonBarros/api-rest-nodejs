/* eslint-disable prettier/prettier */
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
// import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    setupFiles: ["./test/setup-e2e.ts"]
  },
  plugins: [
    //  tsconfigPaths(),
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
  ],
});