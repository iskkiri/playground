import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '#src': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    svgr({
      include: '**/*.svg', // 모든 SVG 파일을 컴포넌트로 변환
      exclude: '**/*.svg?url', // ?url 접미사가 있는 경우는 URL로 처리
      svgrOptions: {
        prettier: false,
        titleProp: true,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                  removeUnknownsAndDefaults: false,
                },
              },
            },
          ],
        },
      },
    }),
  ],
});
