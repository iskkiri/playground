import vitestBrowserConfig from '@repo/vitest-config/browser';
import { defineConfig, mergeConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default mergeConfig(
  vitestBrowserConfig,
  defineConfig({
    plugins: [
      tsconfigPaths(),
      svgr({
        include: '**/*.svg',
        svgrOptions: {
          prettier: false,
          titleProp: true,
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default', // SVGO의 기본 프리셋을 사용합니다.
                params: {
                  overrides: {
                    removeViewBox: false, // removeViewBox를 false로 설정하여 viewBox 속성을 제거하지 않도록 합니다. 이는 SVG가 크기에 맞게 잘 작동하도록 합니다.
                  },
                },
              },
            ],
          },
        },
      }),
    ],
    resolve: {
      alias: {
        '@/assets': path.resolve(__dirname, './public/assets'),
      },
    },
  })
);
