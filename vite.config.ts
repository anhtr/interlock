// `vitest/config` re-exports Vite's own defineConfig with the `test` field
// added, which keeps build and test config in one place.
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// The app is served from https://anhtr.github.io/interlock/, so every asset
// URL needs the repository name as its prefix (ADR 0002).
export default defineConfig({
  base: '/interlock/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
