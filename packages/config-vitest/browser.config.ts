import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, './setups/browser.setup.ts')],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/*.e2e.{test,spec}.{js,ts,jsx,tsx}', // E2E 테스트 제외
      '**/__tests__/e2e/**', // e2e 폴더가 별도로 있다면 제외
    ],
  },
});
