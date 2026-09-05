import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

/**
 * Test runner configuration. Kept separate from vite.config.ts because that
 * file requires PORT and BASE_PATH and loads Replit-only plugins; the tests
 * need neither.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['src/__tests__/setup.ts'],
    css: false,
    testTimeout: 30_000,
  },
});
