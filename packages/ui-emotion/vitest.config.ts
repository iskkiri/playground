import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/*.e2e.{test,spec}.{js,ts,jsx,tsx}', // E2E 테스트 제외
      '**/__tests__/e2e/**', // e2e 폴더가 별도로 있다면 제외
    ],
  },
});
