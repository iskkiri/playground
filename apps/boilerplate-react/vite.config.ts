import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg', // 접미사 ?react 없이 svg컴포넌트를 임포트 할 수 있도록 합니다.
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
                  removeUnknownsAndDefaults: false, // 알 수 없는 요소와 기본 속성을 제거하지 않습니다.
                },
              },
            },
          ],
        },
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
